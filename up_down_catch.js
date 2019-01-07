'use strict';

const Alexa = require('ask-sdk');
// 標準のSDKモジュールがインストールされている場合、'ask-sdk' を使用してください

// ハンドラーのコードはこちら

let skill;

exports.handler = async function(event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                RuleExplanationHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler,
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }

    return skill.invoke(event, context);
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'アップアンドダウン キャッチゲームをはじめます。ゲームの説明を聞く場合は「ゲーム説明をして」と言ってください。すぐにゲームをする場合は「ゲームを始める」と言ってください。'

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .withSimpleCard('Up and down catch', speechText)
            .getResponse();
    }
};

const RuleExplanationHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'RuleExplanationIntent';
    },
    handle(handlerInput) {
        const speechText = 'このゲームは二人以上でやるゲームです。はじめに、二人以上で円形にならんでください。次に、それぞれの右手の人差し指と親指で輪っかを作ってください。最後に、左手の人差し指をしたに向けて左どなりの人の右手の輪っかの中にいれてください。これで準備完了です。次の説明に進んでもよろしいですか？良い場合は「次の説明をして」と言ってください。この説明をもう一度聞く場合は「ゲーム説明をして」と言ってください。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Up and down catch', speechText)
            .getResponse();
    }
};

const RuleExplanation2Handler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'RuleExplanation2Intent';
    },
    handle(handlerInput) {
        const speechText = '私が「アップ」と言ったら左の人差し指を上にあげ、輪っかからだしてください。私が「ダウン」と言ったら人差し指を輪っかの中におろしてください。私が「キャッチ」と言ったら、輪っかの中にある隣の人の人差し指を掴んでください。同時に自分の人差し指が捕まらない様に上に上げてください。隣の人の指を掴み、自分の指が逃げることができた人が勝ちとなります。また、「キャッチ」以外の言葉で逃げたり、捕まえたりしてはいけません。説明は終わりです。ゲームを始める場合は「ゲームを始める」と言ってください。もう一度説明を聞く場合は「ゲーム説明をして」と言ってください。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Up and down catch', speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'こんにちは。と言ってみてください。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'さようなら';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //クリーンアップロジックをここに追加しますe
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};
