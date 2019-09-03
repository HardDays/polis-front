export class Validator
{
    public static ValidateEmail(str: string)
    {
        const EMAIL_REGEXP =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;

        if (str !== '' && str.length >= 5 && EMAIL_REGEXP.test(str))
        {
            return true;
        }

        return false;
    }

    public static ValidateUrl(str: string)
    {
        const REGEXP = /^((http|https):\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/\?#[\]@!\$&'\(\)\*\+,;=.]+$/i;

        if ( str !== '' && REGEXP.test(str))
        {
            return true;
        }

        return false;
    }
}