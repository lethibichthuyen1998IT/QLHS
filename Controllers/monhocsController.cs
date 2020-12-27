using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyHieuSuat.Models;

namespace QuanLyHieuSuat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class monhocsController : ControllerBase
    {
        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();
        [HttpGet]
        public IEnumerable<Monhoc> Index()
        {
            try
            {
                return db.Monhoc.ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}
