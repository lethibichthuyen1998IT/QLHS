using System;
using System.Collections.Generic;

namespace QuanLyHieuSuat.Models
{
    public partial class Phancong
    {
        public int Maphancong { get; set; }
        public string Mavienchuc { get; set; }
        public int? Manamhoc { get; set; }
        public int? Idmonhoc { get; set; }
        public int? Soluong { get; set; }
       
        public virtual Monhoc IdmonhocNavigation { get; set; }
        public virtual Namhoc ManamhocNavigation { get; set; }
        public virtual Vienchuc MavienchucNavigation { get; set; }
    }
}
