//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using QuanLyHieuSuat.DTO;
//using QuanLyHieuSuat.Models;

//namespace QuanLyHieuSuat.Controllers
//{
//    [Route("[controller]")]
//    [ApiController]
//    public class KhenthuongsController : ControllerBase
//    {
//        QuanLyHieuSuatContext db = new QuanLyHieuSuatContext();
//        [HttpGet("THUD/{id}")]
//        public IEnumerable<KhenthuongDTO> THUD(int id)
//        {
//            try
//            {
//                var dg = from a in db.Khenthuong
//                         join b in db.Vienchuc on a.Mavienchuc equals b.Mavienchuc
//                         join c in db.Namhoc on a.Manamhoc equals c.Manamhoc
//                         join d in db.Bomon on b.Mabomon equals d.Mabomon
//                         join e in db.Danhgia on b.Mavienchuc equals e.Mavienchuc
//                         where e.Khoa == 1 && b.Mabomon =="THUD" && a.Manamhoc==id
//                         select new KhenthuongDTO()
//                         {
//                            
//                             Manamhoc = c.Manamhoc,
//                             Tennamhoc = c.Tennamhoc,
//                             Mavienchuc = b.Mavienchuc,
//                             Hoten = b.Hoten,

//                          Loaikhenthuong = a.Loaikhenthuong,
//                                 Tenbomon = d.Tenbomon     



//                         };
//                return dg.ToList();
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
