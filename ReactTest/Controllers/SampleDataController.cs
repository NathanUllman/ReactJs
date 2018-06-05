using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ReactTest.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<EventThing> AllEvents()
        {
            return Events;
        }

        [HttpPost("[action]")]
        public ActionResult SubThat( [FromBody]EventThing yeah )
        {
            yeah.Id = 12;

            Events.Append(yeah);

            return Content("yeah");
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
        private EventThing[] Events = new[]
        {
            new EventThing
            {
                Id = 0,
                Title = "First",
                Capacity = 3,
                Description = "very fun and such"
            },
            new EventThing
            {
                Id = 1,
                Title = "Second",
                Capacity = 6,
                Description = "very fun"
            }
        };

        public class EventThing
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public int Capacity { get; set; }
            public string Description { get; set; }
        }
    }
}

