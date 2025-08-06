# Kubernetes Microservice with MongoDB & Express API

This project demonstrates a simple microservice architecture using **Node.js**, **Express**, and **MongoDB**, deployed on **Kubernetes**.

---

## Repository

**GitHub Link:** 
https://github.com/Arpit795/k8s-microservice

---

## Docker Hub

**Docker Images:** 
https://hub.docker.com/r/arpit79/api-service

---

## Screen Recording Details

This section outlines the exact steps shown in the screen recording, which demonstrates Kubernetes features like object creation, 
service communication, pod recovery, and persistent storage.

1. ### **Object Creation**
   - To apply all YAML files:
 
     kubectl apply -f k8s/
 
   - To apply in order:
     kubectl apply -f k8s/pvc.yaml
     kubectl apply -f k8s/secret.yaml
     kubectl apply -f k8s/configmap.yaml
     kubectl apply -f k8s/mongo-deployment.yaml
     kubectl apply -f k8s/api-deployment.yaml
     kubectl apply -f k8s/api-service.yaml
     kubectl apply -f k8s/ingress.yaml

2. ### **Objects Deployed**
   - Display status of pods, services, PVCs:
 
     kubectl get all
     kubectl get pvc
     kubectl describe pod <pod-name>
 
3. ###  **API Call (GET /users)**
   - Use `curl`:
 
     curl http://<external-ip>/users
     curl http:/34.55.6.87/users
 
   - Users are retrieved from MongoDB.

4. ###  **Kill API Microservice Pod**
   - Delete the API pod:
      kubectl delete pod <api-pod-name>
 
   - automatically recreates (due to Deployment controller).

5. ### **Kill MongoDB Pod & Show Persistent Data**
   - Delete the Mongo pod:
     kubectl delete pod <mongo-pod-name>
 
   - pod comes back.
   - check External IP
     kubectl get svc api-service -w
   - In case External IP is blank
     kubectl patch svc api-service -p '{"spec": {"type": "LoadBalancer"}}'
   - Confirm **data is still present** use below code and put new External IP if any:
     curl http://<external-ip>/users
 

---

##  How to Run This Project

###  Prerequisites:
- Docker
- Google Cloud SDK / Minikube / Docker Desktop (with K8s enabled)
- `kubectl`
- Node.js (for local testing)

---

###  Build & Push Docker Image

cd api/
docker build -t arpit79/api-service:latest .
docker push arpit79/api-service:latest
