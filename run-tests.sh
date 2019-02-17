#!/bin/bash

set -e

if [ -d "projects/$PROJECT_DIR" ]; then
  cd projects/$PROJECT_DIR
  git fetch
  git checkout $TESTING_BRANCH
  git reset --hard origin/$TESTING_BRANCH
  cd ../..
  cypress run
else
  cd projects
  git clone $PROJECT_REPO
  cd ..
  cypress run
fi
