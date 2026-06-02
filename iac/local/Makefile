k8s_config_ctx = --kubeconfig ~/.kube/config
k8s_cluster_name = minikube
k8s_namespace = -n=viteezy-local
k8s_ctx = $${k8s_config_ctx} $${k8s_namespace}
define load_versions
	. ../versions.env && \
	export mariadb backend frontend
endef

login-docker-repository: bootstrap-context
		username=AWS && \
		password=$$(aws ecr get-login-password --region=eu-west-1) && \
		endpoint=https://364293105208.dkr.ecr.eu-west-1.amazonaws.com && \
		secret_name=my-ecr-secret && \
		kubectl $(k8s_ctx) delete secret $$secret_name || echo "AWS/ECR login credentials secret not present" && \
		kubectl $(k8s_ctx) create secret docker-registry $$secret_name --docker-server=$$endpoint --docker-username=$$username --docker-password=$$password;

bootstrap-context:
	kubectl config set-context minikube-viteezy-local --current=false --cluster=minikube --namespace=viteezy-local --user=minikube
	kubectl config use-context minikube-viteezy-local
	kubectl $(k8s_ctx) apply -f 01-bootstrap-create-namespace.yml || echo "Already existing namespace"

bootstrap-thirdparty-specs: bootstrap-context login-docker-repository
	kubectl $(k8s_ctx) apply -f 02-thirdparty-01-db-backend-persistent-volume.yml || echo "Already defined"
	kubectl $(k8s_ctx) apply -f 02-thirdparty-02-db-backend-deployment.yml || echo "Already defined"

bootstrap-services-specs: bootstrap-context login-docker-repository
	$(call load_versions) && cat 03-services-01-backend-02-deployment.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"
	$(call load_versions) && cat 03-services-02-frontend-02-deployment.yml | envsubst | kubectl $(k8s_ctx) apply -f - || echo "Already defined or without change"

migrate-databases: bootstrap-context login-docker-repository bootstrap-thirdparty-specs
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

rollout-newest-versions: SHELL:=/bin/bash
rollout-newest-versions: bootstrap-context login-docker-repository
	$(call load_versions) && \
		kubectl $(k8s_ctx) set image deployment/db-backend db-backend=mariadb:$${mariadb}; \
		kubectl $(k8s_ctx) set image deployment/backend backend=364293105208.dkr.ecr.eu-west-1.amazonaws.com/viteezy_backend:$${backend}; \
		kubectl $(k8s_ctx) set image deployment/frontend frontend=364293105208.dkr.ecr.eu-west-1.amazonaws.com/viteezy_frontend:$${frontend}

deploy: bootstrap-context login-docker-repository bootstrap-thirdparty-specs migrate-databases bootstrap-services-specs

teardown: bootstrap-context
	kubectl delete --all deployment,svc,cm,secret,pod,job,service,statefulset,pvc --namespace=viteezy-local
	kubectl delete pv db-backend-pv-volume-viteezy-local || echo "Not present, assuming clean teardown"
