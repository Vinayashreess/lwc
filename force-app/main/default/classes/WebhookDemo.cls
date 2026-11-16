@RestResource(urlMapping='/api/webhooks/practiceWebhook/*')
global with sharing class WebhookDemo {

    @HttpPost
    global static void handleGitHubEvent() {

        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

        try {
            String eventName = req.headers.get('X-GitHub-Event');

            String body = req.requestBody.toString();

            Map<String, Object> payload =
                (Map<String, Object>) JSON.deserializeUntyped(body);

            if (eventName == 'push') {

                Map<String, Object> repo =
                    (Map<String, Object>) payload.get('repository');

                String repoName = (String) repo.get('full_name');
                String branch = (String) payload.get('ref');

                System.debug('Repository: ' + repoName);
                System.debug('Branch: ' + branch);

                res.statusCode = 200;
                res.responseBody = Blob.valueOf(
                    '{"message":"Push event received"}'
                );

            } else if (eventName == 'ping') {

                res.statusCode = 200;
                res.responseBody = Blob.valueOf(
                    '{"message":"Webhook connection successful"}'
                );

            } else {

                res.statusCode = 200;
                res.responseBody = Blob.valueOf(
                    '{"message":"Event received but not processed"}'
                );
            }

        } catch (Exception e) {

            res.statusCode = 500;
            res.responseBody = Blob.valueOf(
                '{"message":"Internal server error"}'
            );
        }
    }
}