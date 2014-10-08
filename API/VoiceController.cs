using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using NAudio.Lame;
using NAudio.Wave;
using VoiceTextWebAPI.Client;

namespace RomanLettersDrillBook
{
    [RoutePrefix("api")]
    public class VoiceController : Controller
    {
        private void AddBinPath()
        {
            var binPath = this.Server.MapPath("~/bin");
            var path = Environment.GetEnvironmentVariable("PATH") ?? "";
            if (!path.Split(Path.PathSeparator).Contains(binPath, StringComparer.CurrentCultureIgnoreCase))
            {
                path = string.Join(Path.PathSeparator.ToString(), new[] { path, binPath });
                Environment.SetEnvironmentVariable("PATH", path);
            }
        }

        [HttpGet, Route("voice/{value}")]
        public async Task<ActionResult> Get(string value)
        {
            var cacheKey = "14a49c010e4043d19ba3a17219b41421/" + value;
            var cache = this.HttpContext.Cache;
            var voiceMP3Bytes = cache.Get(cacheKey) as byte[];
            
            if (voiceMP3Bytes == null)
            {
                // Convert text to voice data (wave format).
                var voiceTextClient = new VoiceTextClient
                {
                    APIKey = AppSettings.VoiceTextAPI.Key,
                    Speaker = Speaker.Hikari,
                    Emotion = Emotion.Happiness,
                    EmotionLevel = EmotionLevel.High
                };
                var voiceWaveBytes = await voiceTextClient.GetVoiceAsync(value);

                // Convert voice data format from wave to MP3.
                AddBinPath();
                var bitRate = int.Parse(AppSettings.Mp3.BitRate);
                using (var msDst = new MemoryStream())
                {
                    using (var msSrc = new MemoryStream(voiceWaveBytes, writable: false))
                    using (var reader = new WaveFileReader(msSrc))
                    using (var writer = new LameMP3FileWriter(msDst, reader.WaveFormat, bitRate))
                        reader.CopyTo(writer);
                    voiceMP3Bytes = msDst.ToArray();
                }

                // Keep in cache.
                cache.Insert(cacheKey, voiceMP3Bytes);
            }
            
            return File(voiceMP3Bytes, "audio/mp3");
        }
    }
}
