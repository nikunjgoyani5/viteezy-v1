set-new-version:
	sed 's/${SERVICE_DOCKER_IMAGE_NAME}=.*/${SERVICE_DOCKER_IMAGE_NAME}=${SERVICE_DOCKER_IMAGE_VERSION}/g' versions.env > versions.temp.env
	mv -f versions.temp.env versions.env

git-commit-push-new-version:
	git config --list --global
	git add versions.env
	( git commit -a -m 'New service version ${SERVICE_DOCKER_IMAGE_NAME}=${SERVICE_DOCKER_IMAGE_VERSION}' && git push origin master \
	 || echo "Nothing to commit" )
