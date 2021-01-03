<p align="center">
  <a href="https://github.com/anglinb/foam-capture-action/actions"><img alt="typescript-action status" src="https://github.com/anglinb/foam-capture-action/workflows/build-test/badge.svg"></a>
</p>

# Capture knowledge into [foam knowledge base](https://foambubble.github.io/foam/)!

[Foam]() is knowledge graph suit that allows you to collect, visualize and interrelate data. This action allows you to quickly capture your thoughts to an inbox to revisit them later. 

## Usage

### 1. Setup Action
```
name: Manually triggered workflow
on:
  workflow_dispatch:
    inputs:
      data:
        description: 'What information to put in the knowledge base.'
        required: true
        
jobs:
  store_data:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: anglinb/foam-capture-action@main
      with: 
        capture: ${{ github.event.inputs.data }}
    - run: |
        git config --local user.email "example@gmail.com"
        git config --local user.name "Your name"
        git commit -m "Captured from workflow trigger" -a
        git push -u origin master
```

### 2. Invoke Action w/ a `workflow_dispatch` event

*Be sure to replace `GITHUB_TOKEN` with a [Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) with the `repo` scope.*



```
curl \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: Bearer <GITHUB_TOKEN>" \
  -X POST  --data '{"ref": "master", "inputs": { "data": "This will end up in your knowledge base!"}}' jhttps://api.github.com/repos/<owner>/<repository>/actions/workflows/<workflow-id>/dispatches
```

This command won't return any information but you should see the workflow kick off!

*Note: You can find your workflow-id by listing workflow with this command. The id you're looking for is in key `"id"` and will be an integer.*

```
curl \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: Bearer <GITHUB_TOKEN>" \
    https://api.github.com/repos/<owner>/<repository>/actions/workflows
```


### 3. (Optional) Create an iOS Shortcut

I have created [a shortcut](https://www.icloud.com/shortcuts/57d2ed90c40e43a5badcc174ebfaaf1d) trigger the GitHub Action. Copy the shortcut and be sure to fill in the same values you did in the curl example. 

Once this shortcut is working, you should be able to go from share sheet in iOS to knowledge base! ✨