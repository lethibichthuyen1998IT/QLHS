using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Hinhanhtb
    {
        public int Mahinhanh { get; set; }
        public string Linkha { get; set; }
        public int? Mathongbao { get; set; }

        public virtual Thongbao MathongbaoNavigation { get; set; }
    }
}
