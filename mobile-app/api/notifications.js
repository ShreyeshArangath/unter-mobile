import * as SMS from 'expo-sms'

export const sendSMS = async(phoneNumber, text) => {
    const { result } = await SMS.sendSMSAsync(
            phoneNumber,
            text
    );
}