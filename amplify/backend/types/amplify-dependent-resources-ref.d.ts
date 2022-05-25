export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "amplifyphotobookf103b204": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "AmplifyPhotoStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "AmplifyPhotosApi": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "AmplifyPhotoProcessor": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}