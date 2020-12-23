﻿using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Thongbao
    {
        public Thongbao()
        {
            Hinhanhtb = new HashSet<Hinhanhtb>();
        }

        public int Mathongbao { get; set; }
        public string Makhoa { get; set; }
        public string Tieudethongbao { get; set; }
        public string Noidungthongbao { get; set; }
        public string Filethongbao { get; set; }
        public DateTime? Ngaytb { get; set; }




        public virtual Khoa MakhoaNavigation { get; set; }
        public virtual ICollection<Hinhanhtb> Hinhanhtb { get; set; }
    }
}
