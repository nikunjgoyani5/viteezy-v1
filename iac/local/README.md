# Prerequisites

+ aws cli
+ aws credentials
+ minikube
+ kubectl

# Minikube setup

```
minikube start  --disk-size 30GB --cpus 3 --memory 6144
```


# Minikube tear down

```
minikube delete
```


# Minikube utils

```
minikube ssh
minikube dashboard
minikube tunnel
```


# Local K8s environment setup

```
kubectl label nodes minikube persistence/mysql=true
make deploy
```


# Local K8s environment teardown

```
make teardown
```


# K8s utils

```
kubectl set image deployment/backend backend=364293105208.dkr.ecr.eu-west-1.amazonaws.com/viteezy_backend:latest
```


# Disclaimer

Always subfix the name of a PersistenceClaim (pv) with the value of the namespace. PersistenceClaims are not scoped
to the namespace and conflicts may occur with other applications in other namespaces

