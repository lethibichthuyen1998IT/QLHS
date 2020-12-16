using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QuanLyHieuSuat.Models
{
    public partial class QuanLyHieuSuatContext : DbContext
    {
        public QuanLyHieuSuatContext()
        {
        }

        public QuanLyHieuSuatContext(DbContextOptions<QuanLyHieuSuatContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bomon> Bomon { get; set; }
        public virtual DbSet<Chucdanh> Chucdanh { get; set; }
        public virtual DbSet<Chucnang> Chucnang { get; set; }
        public virtual DbSet<Chucvu> Chucvu { get; set; }
        public virtual DbSet<Congviec> Congviec { get; set; }
        public virtual DbSet<Danhgia> Danhgia { get; set; }
        public virtual DbSet<Danhmuc> Danhmuc { get; set; }
        public virtual DbSet<Khenthuong> Khenthuong { get; set; }
        public virtual DbSet<Khoa> Khoa { get; set; }
        public virtual DbSet<Linhvuccongviec> Linhvuccongviec { get; set; }
        public virtual DbSet<Namhoc> Namhoc { get; set; }
        public virtual DbSet<Nguoidanhgia> Nguoidanhgia { get; set; }
        public virtual DbSet<Phancong> Phancong { get; set; }
        public virtual DbSet<Quyen> Quyen { get; set; }
        public virtual DbSet<Thongbao> Thongbao { get; set; }
        public virtual DbSet<Vienchuc> Vienchuc { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server = DESKTOP-910714C\\SQLEXPRESS; Database = QuanLyHieuSuat; Trusted_Connection = True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bomon>(entity =>
            {
                entity.HasKey(e => e.Mabomon)
                    .IsClustered(false);

                entity.ToTable("BOMON");

                entity.HasIndex(e => e.Makhoa)
                    .HasName("GOM_FK");

                entity.Property(e => e.Mabomon)
                    .HasColumnName("MABOMON")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Makhoa)
                    .IsRequired()
                    .HasColumnName("MAKHOA")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenbomon)
                    .HasColumnName("TENBOMON")
                    .HasMaxLength(500);

                entity.HasOne(d => d.MakhoaNavigation)
                    .WithMany(p => p.Bomon)
                    .HasForeignKey(d => d.Makhoa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BOMON_GOM_KHOA");
            });

            modelBuilder.Entity<Chucdanh>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("CHUCDANH");

                entity.Property(e => e.Hangchucdanh)
                    .HasColumnName("HANGCHUCDANH")
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Machucdanh)
                    .IsRequired()
                    .HasColumnName("MACHUCDANH")
                    .HasMaxLength(1000);

                entity.Property(e => e.Tenchucdanh)
                    .HasColumnName("TENCHUCDANH")
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Chucnang>(entity =>
            {
                entity.HasKey(e => e.Machucnang)
                    .IsClustered(false);

                entity.ToTable("CHUCNANG");

                entity.Property(e => e.Machucnang)
                    .HasColumnName("MACHUCNANG")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenchucnang)
                    .HasColumnName("TENCHUCNANG")
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Chucvu>(entity =>
            {
                entity.HasKey(e => e.Machucvu)
                    .IsClustered(false);

                entity.ToTable("CHUCVU");

                entity.Property(e => e.Machucvu)
                    .HasColumnName("MACHUCVU")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenchucvu)
                    .HasColumnName("TENCHUCVU")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Congviec>(entity =>
            {
                entity.HasKey(e => e.Macongviec)
                    .IsClustered(false);

                entity.ToTable("CONGVIEC");

                entity.HasIndex(e => e.Manamhoc)
                    .HasName("TRONG_FK");

                entity.HasIndex(e => e.Masodanhmuc)
                    .HasName("BAO_GOM_FK");

                entity.HasIndex(e => e.Mavienchuc)
                    .HasName("THUC_HIEN_FK");

                entity.Property(e => e.Macongviec).HasColumnName("MACONGVIEC");

                entity.Property(e => e.Diadiem)
                    .HasColumnName("DIADIEM")
                    .HasMaxLength(1000);

                entity.Property(e => e.Filecongvec)
                    .HasColumnName("FILECONGVEC")
                    .HasMaxLength(1000);

                entity.Property(e => e.Manamhoc).HasColumnName("MANAMHOC");

                entity.Property(e => e.Masodanhmuc).HasColumnName("MASODANHMUC");

                entity.Property(e => e.Mavienchuc)
                    .IsRequired()
                    .HasColumnName("MAVIENCHUC")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaythuchien)
                    .HasColumnName("NGAYTHUCHIEN")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tencongviec)
                    .HasColumnName("TENCONGVIEC")
                    .HasMaxLength(4000);

                entity.Property(e => e.Thoigian)
                    .HasColumnName("THOIGIAN")
                    .HasMaxLength(50);

                entity.HasOne(d => d.ManamhocNavigation)
                    .WithMany(p => p.Congviec)
                    .HasForeignKey(d => d.Manamhoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CONGVIEC_TRONG_NAMHOC");

                entity.HasOne(d => d.MasodanhmucNavigation)
                    .WithMany(p => p.Congviec)
                    .HasForeignKey(d => d.Masodanhmuc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CONGVIEC_BAO_GOM_DANHMUC");

                entity.HasOne(d => d.MavienchucNavigation)
                    .WithMany(p => p.Congviec)
                    .HasForeignKey(d => d.Mavienchuc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CONGVIEC_THUC_HIEN_VIENCHUC");
            });

            modelBuilder.Entity<Danhgia>(entity =>
            {
                entity.HasKey(e => e.Masodanhgia)
                    .IsClustered(false);

                entity.ToTable("DANHGIA");

                entity.HasIndex(e => e.Manamhoc)
                    .HasName("THUOC_NAM_HOC_FK");

                entity.HasIndex(e => e.Mavienchuc)
                    .HasName("_ANH_GIA_FK");

                entity.Property(e => e.Masodanhgia)
                    .HasColumnName("MASODANHGIA")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Bomon)
                    .HasColumnName("BOMON")
                    .HasMaxLength(4000);

                entity.Property(e => e.Daoduc)
                    .HasColumnName("DAODUC")
                    .HasMaxLength(4000);

                entity.Property(e => e.Khac)
                    .HasColumnName("KHAC")
                    .HasMaxLength(4000);

                entity.Property(e => e.Khoa).HasColumnName("KHOA");

                entity.Property(e => e.Kqth)
                    .HasColumnName("KQTH")
                    .HasMaxLength(4000);

                entity.Property(e => e.Loai).HasColumnName("LOAI");

                entity.Property(e => e.Manamhoc).HasColumnName("MANAMHOC");

                entity.Property(e => e.Mavienchuc)
                    .IsRequired()
                    .HasColumnName("MAVIENCHUC")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaybmdg)
                    .HasColumnName("NGAYBMDG")
                    .HasColumnType("date");

                entity.Property(e => e.Ngaykhoadg)
                    .HasColumnName("NGAYKHOADG")
                    .HasColumnType("date");

                entity.Property(e => e.Ngayvcdg)
                    .HasColumnName("NGAYVCDG")
                    .HasColumnType("date");

                entity.Property(e => e.Nhuocdiem)
                    .HasColumnName("NHUOCDIEM")
                    .HasMaxLength(4000);

                entity.Property(e => e.Trachnhiem)
                    .HasColumnName("TRACHNHIEM")
                    .HasMaxLength(4000);

                entity.Property(e => e.Uudiem)
                    .HasColumnName("UUDIEM")
                    .HasMaxLength(4000);

                entity.Property(e => e.Ykbm)
                    .HasColumnName("YKBM")
                    .HasMaxLength(4000);

                entity.Property(e => e.Ykienkhoa)
                    .HasColumnName("YKIENKHOA")
                    .HasMaxLength(4000);

                entity.HasOne(d => d.ManamhocNavigation)
                    .WithMany(p => p.Danhgia)
                    .HasForeignKey(d => d.Manamhoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DANHGIA_THUOC_NAM_NAMHOC");

                entity.HasOne(d => d.MavienchucNavigation)
                    .WithMany(p => p.Danhgia)
                    .HasForeignKey(d => d.Mavienchuc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DANHGIA__ANH_GIA_VIENCHUC");
            });

            modelBuilder.Entity<Danhmuc>(entity =>
            {
                entity.HasKey(e => e.Masodanhmuc)
                    .IsClustered(false);

                entity.ToTable("DANHMUC");

                entity.HasIndex(e => e.Masolinhvuc)
                    .HasName("GOM_CO_FK");

                entity.Property(e => e.Masodanhmuc).HasColumnName("MASODANHMUC");

                entity.Property(e => e.Masolinhvuc).HasColumnName("MASOLINHVUC");

                entity.Property(e => e.Tendanhmuc)
                    .HasColumnName("TENDANHMUC")
                    .HasMaxLength(1000);

                entity.HasOne(d => d.MasolinhvucNavigation)
                    .WithMany(p => p.Danhmuc)
                    .HasForeignKey(d => d.Masolinhvuc)
                    .HasConstraintName("FK_DANHMUC_GOM_CO_LINHVUCC");
            });

            modelBuilder.Entity<Khenthuong>(entity =>
            {
                entity.HasKey(e => new { e.Manamhoc, e.Mavienchuc });

                entity.ToTable("KHENTHUONG");

                entity.HasIndex(e => e.Manamhoc)
                    .HasName("KHENTHUONG_FK");

                entity.HasIndex(e => e.Mavienchuc)
                    .HasName("KHENTHUONG2_FK");

                entity.Property(e => e.Manamhoc).HasColumnName("MANAMHOC");

                entity.Property(e => e.Mavienchuc)
                    .HasColumnName("MAVIENCHUC")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Loaikhenthuong)
                    .HasColumnName("LOAIKHENTHUONG")
                    .HasMaxLength(50);

                entity.HasOne(d => d.ManamhocNavigation)
                    .WithMany(p => p.Khenthuong)
                    .HasForeignKey(d => d.Manamhoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KHENTHUO_KHENTHUON_NAMHOC");

                entity.HasOne(d => d.MavienchucNavigation)
                    .WithMany(p => p.Khenthuong)
                    .HasForeignKey(d => d.Mavienchuc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_KHENTHUO_KHENTHUON_VIENCHUC");
            });

            modelBuilder.Entity<Khoa>(entity =>
            {
                entity.HasKey(e => e.Makhoa)
                    .IsClustered(false);

                entity.ToTable("KHOA");

                entity.Property(e => e.Makhoa)
                    .HasColumnName("MAKHOA")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenkhoa)
                    .HasColumnName("TENKHOA")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Linhvuccongviec>(entity =>
            {
                entity.HasKey(e => e.Masolinhvuc)
                    .IsClustered(false);

                entity.ToTable("LINHVUCCONGVIEC");

                entity.Property(e => e.Masolinhvuc).HasColumnName("MASOLINHVUC");

                entity.Property(e => e.Tenlinhvuc)
                    .HasColumnName("TENLINHVUC")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Namhoc>(entity =>
            {
                entity.HasKey(e => e.Manamhoc)
                    .IsClustered(false);

                entity.ToTable("NAMHOC");

                entity.Property(e => e.Manamhoc).HasColumnName("MANAMHOC");

                entity.Property(e => e.Tennamhoc)
                    .HasColumnName("TENNAMHOC")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Nguoidanhgia>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("NGUOIDANHGIA");

                entity.Property(e => e.Masodanhgia).HasColumnName("MASODANHGIA");

                entity.Property(e => e.Mavienchuc)
                    .HasColumnName("MAVIENCHUC")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Phancong>(entity =>
            {
                entity.HasKey(e => e.Maphancong)
                    .IsClustered(false);

                entity.ToTable("PHANCONG");

                entity.HasIndex(e => e.Mavienchuc)
                    .HasName("_UOC_FK");

                entity.Property(e => e.Maphancong).HasColumnName("MAPHANCONG");

                entity.Property(e => e.Baibaongoainuoc).HasColumnName("BAIBAONGOAINUOC");

                entity.Property(e => e.Baibaotrongnuoc).HasColumnName("BAIBAOTRONGNUOC");

                entity.Property(e => e.Ghichu)
                    .HasColumnName("GHICHU")
                    .HasMaxLength(1000);

                entity.Property(e => e.Giogiang).HasColumnName("GIOGIANG");

                entity.Property(e => e.Luanvan).HasColumnName("LUANVAN");

                entity.Property(e => e.Manamhoc).HasColumnName("MANAMHOC");

                entity.Property(e => e.Mavienchuc)
                    .HasColumnName("MAVIENCHUC")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Nckh).HasColumnName("NCKH");

                entity.HasOne(d => d.ManamhocNavigation)
                    .WithMany(p => p.Phancong)
                    .HasForeignKey(d => d.Manamhoc)
                    .HasConstraintName("FK_PHANCONG_NAMHOC");

                entity.HasOne(d => d.MavienchucNavigation)
                    .WithMany(p => p.Phancong)
                    .HasForeignKey(d => d.Mavienchuc)
                    .HasConstraintName("FK_PHANCONG__UOC_VIENCHUC");
            });

            modelBuilder.Entity<Quyen>(entity =>
            {
                entity.HasKey(e => new { e.Machucvu, e.Machucnang });

                entity.ToTable("QUYEN");

                entity.HasIndex(e => e.Machucnang)
                    .HasName("QUYEN2_FK");

                entity.HasIndex(e => e.Machucvu)
                    .HasName("QUYEN_FK");

                entity.Property(e => e.Machucvu)
                    .HasColumnName("MACHUCVU")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Machucnang)
                    .HasColumnName("MACHUCNANG")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.MachucnangNavigation)
                    .WithMany(p => p.Quyen)
                    .HasForeignKey(d => d.Machucnang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUYEN_QUYEN2_CHUCNANG");

                entity.HasOne(d => d.MachucvuNavigation)
                    .WithMany(p => p.Quyen)
                    .HasForeignKey(d => d.Machucvu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUYEN_QUYEN_CHUCVU");
            });

            modelBuilder.Entity<Thongbao>(entity =>
            {
                entity.HasKey(e => e.Mathongbao)
                    .IsClustered(false);

                entity.ToTable("THONGBAO");

                entity.HasIndex(e => e.Makhoa)
                    .HasName("CO_FK");

                entity.Property(e => e.Mathongbao).HasColumnName("MATHONGBAO");

                entity.Property(e => e.Filethongbao)
                    .HasColumnName("FILETHONGBAO")
                    .HasMaxLength(1000);

                entity.Property(e => e.Makhoa)
                    .IsRequired()
                    .HasColumnName("MAKHOA")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Noidungthongbao)
                    .HasColumnName("NOIDUNGTHONGBAO")
                    .HasMaxLength(4000);

                entity.Property(e => e.Tieudethongbao)
                    .HasColumnName("TIEUDETHONGBAO")
                    .HasMaxLength(1000);

                entity.HasOne(d => d.MakhoaNavigation)
                    .WithMany(p => p.Thongbao)
                    .HasForeignKey(d => d.Makhoa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_THONGBAO_CO_KHOA");
            });

            modelBuilder.Entity<Vienchuc>(entity =>
            {
                entity.HasKey(e => e.Mavienchuc)
                    .IsClustered(false);

                entity.ToTable("VIENCHUC");

                entity.HasIndex(e => e.Mabomon)
                    .HasName("THUOC_FK");

                entity.HasIndex(e => e.Machucdanh)
                    .HasName("GIU_FK");

                entity.HasIndex(e => e.Machucvu)
                    .HasName("RELATIONSHIP_1_FK");

                entity.Property(e => e.Mavienchuc)
                    .HasColumnName("MAVIENCHUC")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Diachi)
                    .HasColumnName("DIACHI")
                    .HasMaxLength(1000);

                entity.Property(e => e.Gioitinh).HasColumnName("GIOITINH");

                entity.Property(e => e.Hoten)
                    .HasColumnName("HOTEN")
                    .HasMaxLength(50);

                entity.Property(e => e.Mabomon)
                    .IsRequired()
                    .HasColumnName("MABOMON")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Machucdanh)
                    .IsRequired()
                    .HasColumnName("MACHUCDANH")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Machucvu)
                    .IsRequired()
                    .HasColumnName("MACHUCVU")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Mail)
                    .HasColumnName("MAIL")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Matkhau)
                    .HasColumnName("MATKHAU")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaylamviec)
                    .HasColumnName("NGAYLAMVIEC")
                    .HasColumnType("datetime");

                entity.Property(e => e.Ngaysinh)
                    .HasColumnName("NGAYSINH")
                    .HasColumnType("datetime");

                entity.Property(e => e.Sdt)
                    .HasColumnName("SDT")
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
