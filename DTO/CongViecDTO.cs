using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyHieuSuat.DTO
{
    public class CongViecDTO
    {
        public int Macongviec { get; set; }
        public int Manamhoc { get; set; }
        public string Tennamhoc { get; set; }
      

        public string Mavienchuc { get; set; }
        public string Hoten { get; set; }

        public int Masodanhmuc { get; set; }
        public string Tendanhmuc { get; set; }
        public string Tencongviec { get; set; }
     
        public string Diadiem { get; set; }
        public DateTime? Thoigianbd { get; set; }
        public DateTime? Thoigiankt { get; set; }
        public string Filecongvec { get; set; }
        public int? Mucdoht { get; set; }


    }
}
