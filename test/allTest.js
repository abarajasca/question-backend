import { after, describe } from 'mocha';

import { describeLmm } from './llm/llm.test.js'
import { describeAuth } from './auth/auth.test.js';

// Test wrapper to close application only once.
describe('All Test wrapper', () => {

    after(async () => {
        // Wait to get results if some test fails.    
        setTimeout(async () => {
            process.kill(process.pid, 'SIGTERM')
        }, 2000)
    })
    
    describeAuth()

    describeLmm()

})
