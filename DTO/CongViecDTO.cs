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
        public DateTime? Ngaythuchien { get; set; }
        public string Diadiem { get; set; }
        public string Thoigian { get; set; }
        public string Filecongvec { get; set; }


    }
}
