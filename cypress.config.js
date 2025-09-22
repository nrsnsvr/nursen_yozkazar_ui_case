const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://useinsider.com',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 30000,
        video: false,
        screenshotOnRunFailure: true,
        env: {
            baseUrl: 'https://useinsider.com',
            careersUrl: 'https://useinsider.com/careers',
            qaUrl: 'https://useinsider.com/careers/quality-assurance',
            jobsUrl: 'https://jobs.lever.co/useinsider'
        }
    }
})