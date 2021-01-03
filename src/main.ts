import * as process from 'process'
import * as core from '@actions/core'
import {
  opinionatedBootstrap,
  captureToInbox,
  cleanupReferences
} from 'foam-capture'

async function run(): Promise<void> {
  try {
    const capture: string = core.getInput('capture')
    core.debug(`Got value to capture: ${capture}`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    let workspace: string = core.getInput('workspace')
    if (workspace == '' && process.env['GITHUB_WORKSPACE'] !== undefined) {
      workspace = process.env['GITHUB_WORKSPACE']
    }
    if (workspace === undefined) {
      core.setFailed(
        'Unable to resolve workspace from input or GITHUB_WORKSPACE'
      )
      return
    }
    const foam = await opinionatedBootstrap(workspace)
    await captureToInbox(foam, capture)
    await cleanupReferences(foam, {'without-extensions': undefined})

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
