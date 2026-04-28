#!/bin/bash
echo "Installing gcloud CLI if missing..."
brew info google-cloud-sdk &>/dev/null || brew install --cask gcloud-cli

echo "Authenticating to Google Cloud..."
gcloud auth login

echo "Setting project to swift-impulse-494713-v6..."
gcloud config set project swift-impulse-494713-v6

echo "Deploying election-assistant to Google Cloud Run..."
gcloud run deploy election-assistant --source . --region us-central1 --allow-unauthenticated

echo "Deployment complete!"
