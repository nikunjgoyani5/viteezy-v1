# Prerequisites

+ aws cli
+ aws credentials
+ kubectl

# Staging K8s environment setup

```
make deploy
```


# Staging K8s environment teardown

```
make teardown
```


# K8s utils

```
make bootstrap-context
kubectl set image deployment/backend backend=364293105208.dkr.ecr.eu-west-1.amazonaws.com/viteezy_backend:latest
```


# Disclaimer

Always subfix the name of a PersistenceClaim (pv) with the value of the namespace. PersistenceClaims are not scoped
to the namespace and conflicts may occur with other applications in other namespaces

When setting up databases you need to create a viteezyUser manually