'use strict';

const Alexa = require('ask-sdk');


let skill;

exports.handler = async function(event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                RuleExplanationHandler,
                NextExplanationHandler,
                GameHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
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
        const speechText = 'アップアンドダウンキャッチゲームをはじめます。ゲームの説明を聞く場合は「ルール説明をして」と言ってください。すぐにゲームをする場合は「ゲームを始める」と言ってください。ゲームが終了した後もう一度ゲームをする場合は「もう一回ゲームを始める」と言ってください。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .withSimpleCard('UpDownCatch', speechText)
            .getResponse();
    }
};

const RuleExplanationHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'RuleExplanationIntent';
    },
    handle(handlerInput) {
        const speechText = 'このゲームは二人以上でやるゲームです。はじめに、二人以上で円形にならんでください。次に、それぞれの右手の人差し指と親指で輪っかを作ってください。最後に、左手の人差し指をしたに向けて左どなりの人の輪っかの中にいれてください。これで準備完了です。次の説明に進んでもよろしいですか？良い場合は「次の説明をして」と言ってください。この説明をもう一度聞く場合は「ルール説明をして」と言ってください。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .withSimpleCard('UpDownCatch', speechText)
            .getResponse();
    }
};

const NextExplanationHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'NextExplanationIntent';
    },
    handle(handlerInput) {
        const speechText = '私が「アップ」と言ったら人差し指を上にあげ、輪っかからだしてください。私が「ダウン」と言ったら人差し指を輪っかの中におろしてください。私が「キャッチ」と言ったら、輪っかの中にある隣の人の指を掴んでください。同時に自分の指が捕まらない様に上に上げてください。隣の人の指を掴み、自分の指が逃げることができた人が勝ちとなります。また、「キャッチ」以外の言葉で逃げたり、捕まえたりしてはいけません。説明は終わりです。ゲームを始める場合は「ゲームを始める」と言ってください。もう一度説明を聞く場合は「ルール説明をして」と言ってください。';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .withSimpleCard('UpDownCatch', speechText)
            .getResponse();
    }
};

const GameHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'GameIntent';
    },
    handle(handlerInput) {
        var speechUpDown = 'アップ<break time="2s"/><emphasis level="strong">ダウン</emphasis><break time="2s"/>';
        var speechCacth = '<prosody rate="x-fast">キャッチ</prosody>';
        var speechCabbge = '<prosody rate="x-fast">キャッツアイ</prosody><break time="2s"/>';
        var randomNum = Math.floor(Math.random() * 4);
        console.log(randomNum);
        var speechText = "";
        switch (randomNum){
            case 0:
                speechText = speechUpDown + speechCacth;
                break;
            case 1:
                speechText = speechUpDown + speechUpDown + speechCacth;
                break;
            case 2:
                speechText = speechUpDown + speechUpDown + speechUpDown + speechCacth;
                break;
            case 3:
                speechText = speechUpDown + speechUpDown + speechUpDown + speechCabbge + speechCacth;
                break;
        }
        console.log(speechText);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .getResponse();
    }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'ゲームをする場合は「ゲームを始める」と言ってください。ルールを聞く場合は「ルール説明をして」と言ってください。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('UpDownCatch', speechText)
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
            .withSimpleCard('UpDownCatch', speechText)
            .getResponse();
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
