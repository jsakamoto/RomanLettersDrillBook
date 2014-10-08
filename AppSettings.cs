using System.Configuration;

namespace RomanLettersDrillBook
{
    [System.Diagnostics.DebuggerNonUserCodeAttribute]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute]
    public static class AppSettings
    {
        public static class Mp3
        {
            public static string BitRate
            {
                get { return ConfigurationManager.AppSettings["mp3.bitRate"]; }
            }
        }

        public static class VoiceTextAPI
        {
            public static string Key
            {
                get { return ConfigurationManager.AppSettings["voiceTextAPI.Key"]; }
            }
        }
    }
}

