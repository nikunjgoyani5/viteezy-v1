k8s_namespace = -n=viteezy-staging
k8s_ctx = $(k8s_namespace)
GOOGLE_PROJECT_ID = "viteezy"
GOOGLE_COMPUTE_REGION = "europe-west4"
GOOGLE_COMPUTE_ZONE = "europe-west4-a"
GOOGLE_CLUSTER_NAME = "viteezy-cluster"
define load_versions
	. ../versions.env && \
	export backend frontend strapi dashboard
endef

login-docker-repository:
	gcloud auth activate-service-account --key-file=$${GCLOUD_SERVICE_KEY}
	gcloud --quiet config set project ${GOOGLE_PROJECT_ID}
	gcloud --quiet config set compute/region ${GOOGLE_COMPUTE_REGION}
	gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
	gcloud --quiet container clusters get-credentials ${GOOGLE_CLUSTER_NAME} --region=${GOOGLE_COMPUTE_ZONE}
	gcloud --quiet auth configure-docker europe-docker.pkg.dev
	gcloud --quiet auth configure-docker europe-west4-docker.pkg.dev

bootstrap-context: login-docker-repository
	kubectl config current-context
	kubectl $(k8s_config_ctx) apply -f 01-bootstrap-01-create-namespace.yml || echo "Already existing namespace"

bootstrap-thirdparty-specs: bootstrap-context
	kubectl $(k8s_ctx) apply -f 02-thirdparty-01-db-service.yml || echo "Already defined or without change"
	kubectl $(k8s_ctx) apply -f 02-thirdparty-04-strapi-config.yml || echo "Already defined or without change"
	kubectl $(k8s_ctx) apply -f 02-thirdparty-05-01-strapi-persistent-volume.yml || echo "Already defined or without change"

bootstrap-services-specs: bootstrap-context
	$(call load_versions) && cat 02-thirdparty-05-strapi-deploy.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-01-backend-01-internal-service.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-01-backend-02-deployment.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-02-frontend-01-internal-service.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-02-frontend-02-deployment.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-03-dashboard-01-internal-service.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-03-dashboard-02-deployment.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-networking-01-ingress.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-01-payment-missing-job-2.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-01-payment-missing-job-3.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-02-subscription-payment-job.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-03-update-payment-delivery-date-job.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-04-post-nl-fulfilment-job.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-05-order-pdf-processing.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-06-post-nl-shipment-response.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-07-pharmacist-request.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-08-post-nl-shipment-status.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 04-jobs-09-upcoming-payment-job.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"

migrate-databases: bootstrap-context bootstrap-thirdparty-specs
	kubectl $(k8s_ctx) delete job flyway-schema || echo "Migration job not present. Assuming clean setup"
	kubectl $(k8s_ctx) delete cm db-backend-schema-migrations || echo "Migration job not present. Assuming clean setup"
	kubectl $(k8s_ctx) create cm db-backend-schema-migrations --from-file=../_db/flyway/backend/schemas || echo "Migration job not present. Assuming clean setup"
	kubectl $(k8s_ctx) apply -f 02-thirdparty-03-flyway-backend-01-schema-job.yml
	kubectl $(k8s_ctx) wait --for=condition=complete --timeout=600s job/flyway-schema
	@echo "=== Inserting some default data ==="
	kubectl $(k8s_ctx) delete job flyway-data || echo "Migration job not present. Assuming clean setup"
	kubectl $(k8s_ctx) delete cm db-backend-data-migrations || echo "Migration job not present. Assuming clean setup"
	kubectl $(k8s_ctx) create cm db-backend-data-migrations --from-file=../_db/flyway/backend/data || echo "Migration job not present. Assuming clean setup"
	kubectl $(k8s_ctx) apply -f 02-thirdparty-03-flyway-backend-02-data-job.yml
	kubectl $(k8s_ctx) wait --for=condition=complete --timeout=600s job/flyway-data

deploy-new-service-version: bootstrap-context
	kubectl $(k8s_ctx) set image ${k8s_deployment_key} ${k8s_deployment_value}=${IMAGE_FULL_QUALIFIED}

rollout-newest-versions: SHELL:=/bin/bash
rollout-newest-versions: bootstrap-context
	$(call load_versions) && \
		kubectl $(k8s_ctx) set image deployment/strapi-app strapi=europe-west4-docker.pkg.dev/viteezy/cms/docker:$${strapi}; \
		kubectl $(k8s_ctx) set image deployment/dashboard dashboard=europe-docker.pkg.dev/viteezy/dashboard/docker:$${dashboard}; \
		kubectl $(k8s_ctx) set image deployment/backend backend=europe-docker.pkg.dev/viteezy/backend/docker:$${backend}; \
		kubectl $(k8s_ctx) set image deployment/frontend frontend=europe-docker.pkg.dev/viteezy/frontend/docker:$${frontend}

check-deploy:
	kubectl $(k8s_ctx) rollout status deployment/backend deployment/frontend

deploy: bootstrap-context bootstrap-thirdparty-specs migrate-databases bootstrap-services-specs check-deploy
