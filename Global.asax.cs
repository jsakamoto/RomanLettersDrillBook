using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace RomanLettersDrillBook
{
    public class WebApp : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            RouteTable.Routes.MapMvcAttributeRoutes();
        }
    }
}