using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Phancong
    {
        public int Maphancong { get; set; }
        public string Mavienchuc { get; set; }
        public int? Giogiang { get; set; }
        public int? Luanvan { get; set; }
        public int? Baibaotrongnuoc { get; set; }
        public int? Baibaongoainuoc { get; set; }
        public int? Nckh { get; set; }
        public string Ghichu { get; set; }
        public int? Manamhoc { get; set; }

        public virtual Namhoc ManamhocNavigation { get; set; }
        public virtual Vienchuc MavienchucNavigation { get; set; }
    }
}
