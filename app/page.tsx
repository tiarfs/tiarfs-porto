"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  MapPin,
  Linkedin,
  User,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  Calendar,
  Award,
  ImageIcon,
  FileText,
  Monitor,
  Settings,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activePortfolioTab, setActivePortfolioTab] = useState("ticketing")

  const roles = [
    "Helpdesk NOC Engineer",
    "Network Operations Specialist",
    "Telecommunications Professional",
    "IT Support Expert",
  ]

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentIndex]
    let charIndex = 0
    let isDeleting = false

    const typeInterval = setInterval(
      () => {
        if (!isDeleting && charIndex < currentRole.length) {
          setTypedText(currentRole.substring(0, charIndex + 1))
          charIndex++
        } else if (isDeleting && charIndex > 0) {
          setTypedText(currentRole.substring(0, charIndex - 1))
          charIndex--
        } else if (!isDeleting && charIndex === currentRole.length) {
          setTimeout(() => {
            isDeleting = true
          }, 2000)
        } else if (isDeleting && charIndex === 0) {
          setCurrentIndex((prev) => (prev + 1) % roles.length)
          isDeleting = false
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearInterval(typeInterval)
  }, [currentIndex])

  // Scroll listener untuk mengupdate active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100 // offset dikurangi dari 180 ke 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // offset dikurangi dari 160 ke 80 untuk lebih presisi
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  const navItems = [
    { id: "home", label: "Beranda" },
    { id: "about", label: "Tentang" },
    { id: "experience", label: "Pengalaman" },
    { id: "education", label: "Pendidikan" },
    { id: "skills", label: "Keahlian" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Kontak" },
  ]

  const portfolioTabs = [
    { id: "ticketing", label: "Sistem Ticketing", icon: FileText, count: 5 },
    { id: "reports", label: "Laporan", icon: ImageIcon, count: 1 },
    { id: "monitoring", label: "Monitoring", icon: Monitor, count: 5 },
    { id: "config", label: "Konfigurasi", icon: Settings, count: 4 },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Skip jika semua field kosong
    if (!name.trim() && !email.trim() && !subject.trim() && !message.trim()) {
      return
    }

    // Buat mailto link hanya dengan data yang ada
    const emailParts = []
    if (subject.trim()) emailParts.push(`subject=${encodeURIComponent(subject)}`)

    let body = ""
    if (name.trim()) body += `Nama: ${name}\n`
    if (email.trim()) body += `Email: ${email}\n`
    if (message.trim()) body += `\nPesan:\n${message}`

    if (body) emailParts.push(`body=${encodeURIComponent(body)}`)

    const mailtoLink = `mailto:tiarfirmansss@gmail.com${emailParts.length > 0 ? "?" + emailParts.join("&") : ""}`
    window.location.href = mailtoLink

    // Reset form
    e.currentTarget.reset()
  }

  const renderPortfolioImages = (category: string, count: number) => {
    // Data gambar khusus untuk ticketing dengan deskripsi yang sesuai
    const ticketingImages = [
      {
        id: "ticketing-1",
        title: "Dashboard ICRM+",
        description:
          "Tampilan utama sistem ticketing ICRM+ yang menunjukkan daftar tiket dengan berbagai status dan informasi detail",
        src: "/images/ticketing-1.png",
      },
      {
        id: "ticketing-2",
        title: "Status Tiket Open",
        description: "Tampilan detail tiket dalam status 'Open' dengan informasi lengkap insiden dan data pelanggan",
        src: "/images/ticketing-2.jpeg",
      },
      {
        id: "ticketing-3",
        title: "Proses Analisa",
        description:
          "Form analisa tiket dengan data teknis seperti optical loss, threshold, dan parameter jaringan lainnya",
        src: "/images/ticketing-3.jpeg",
      },
      {
        id: "ticketing-4",
        title: "Eskalasi Tiket",
        description: "Form pembuatan insiden baru dan proses eskalasi tiket ke tim teknis yang lebih tinggi",
        src: "/images/ticketing-4.jpeg",
      },
      {
        id: "ticketing-5",
        title: "Penutupan Tiket",
        description: "Proses check incident dan penutupan tiket dengan timeline lengkap dan summary penyelesaian",
        src: "/images/ticketing-5.png",
      },
    ]

    // Data gambar untuk laporan
    const laporanImages = [
      {
        id: "laporan-1",
        title: "Laporan Gangguan Bulanan",
        description:
          "Spreadsheet Excel berisi data gangguan bulanan April 2025 dengan kategorisasi zona, status tiket, dan jenis gangguan menggunakan color coding untuk memudahkan analisis",
        src: "/images/laporan-1.png",
      },
    ]

    // Data gambar untuk monitoring
    const monitoringImages = [
      {
        id: "monitoring-1",
        title: "Dashboard Surveillance",
        description:
          "Interface monitoring surveillance dengan filter alarm dan daftar alarm aktif berdasarkan severity level (Critical, Major, Minor, Warning)",
        src: "/images/monitoring-1.jpeg",
      },
      {
        id: "monitoring-2",
        title: "NMS Sinergi Dashboard",
        description:
          "Dashboard NMS Sinergi menampilkan statistik real-time alarm dengan breakdown: 0 Critical, 3 Major, 23 Minor, 24 Warning, dan 49 Commhost",
        src: "/images/monitoring-2.jpeg",
      },
      {
        id: "monitoring-3",
        title: "SCADA Premium Topology",
        description:
          "Diagram topologi jaringan SCADA Premium yang menunjukkan koneksi antar perangkat dengan indikator status OK/Down untuk monitoring infrastruktur",
        src: "/images/monitoring-3.jpeg",
      },
      {
        id: "monitoring-4",
        title: "SCADA Grid Monitoring",
        description:
          "Grid monitoring SCADA dengan visualisasi perangkat dalam bentuk ikon, menampilkan status operasional dan perangkat yang mengalami 'Host is Down'",
        src: "/images/monitoring-4.jpeg",
      },
      {
        id: "monitoring-5",
        title: "GSM Network Monitoring",
        description:
          "Sistem monitoring jaringan GSM dengan tampilan perangkat router/switch, indikator warna merah menunjukkan perangkat yang bermasalah atau down",
        src: "/images/monitoring-5.jpeg",
      },
    ]

    // Data gambar untuk konfigurasi
    const konfigurasiImages = [
      {
        id: "config-1",
        title: "Konfigurasi Fiberhome",
        description:
          "Tampilan CLI konfigurasi perangkat Fiberhome meliputi pengaturan TACACS server, interface gigaethernet, DHCP snooping, dan routing static untuk optimasi jaringan",
        src: "/images/config-1.jpeg",
      },
      {
        id: "config-2",
        title: "Pengecekan Status Cisco ASR920",
        description:
          "Monitoring uplink/downlink Cisco ASR920 dengan detail protocol status, hardware address, MTU, bandwidth, dan statistik traffic input/output untuk troubleshooting",
        src: "/images/config-2.jpeg",
      },
      {
        id: "config-3",
        title: "Konfigurasi BDCOM",
        description:
          "Interface CLI BDCOM menampilkan konfigurasi port description, VLAN settings, trunk configuration, dan statistik traffic untuk manajemen switching",
        src: "/images/config-3.jpeg",
      },
      {
        id: "config-4",
        title: "Pengecekan Status Zyxel",
        description:
          "Verifikasi uplink/downlink perangkat Zyxel dengan informasi port status, speed, duplex mode, VLAN configuration, dan MAC address table untuk diagnostik jaringan",
        src: "/images/config-4.jpeg",
      },
    ]

    // Pilih data berdasarkan kategori
    let images
    if (category === "ticketing") {
      images = ticketingImages
    } else if (category === "laporan") {
      images = laporanImages
    } else if (category === "monitoring") {
      images = monitoringImages
    } else if (category === "konfigurasi") {
      images = konfigurasiImages
    } else {
      // Untuk kategori lain, gunakan placeholder
      images = Array.from({ length: count }, (_, index) => ({
        id: `${category}-${index + 1}`,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${index + 1}`,
        description: `Bukti kerja ${category} - Gambar ${index + 1}`,
        src: null,
      }))
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-4">
                {image.src ? (
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Gambar akan ditambahkan</p>
                      <p className="text-xs text-slate-400">{image.title}</p>
                    </div>
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{image.title}</h4>
              <p className="text-sm text-slate-600">{image.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-emerald-600">Tiar Firman Syah</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            Halo, Saya <span className="text-emerald-600">Tiar Firman Syah</span>
          </h1>

          <div className="text-xl md:text-2xl text-slate-600 mb-6 h-8">
            <span>{typedText}</span>
            <span className="animate-pulse">|</span>
          </div>

          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Profesional Helpdesk NOC di PT PLN ICON+ SBU Jabar yang berspesialisasi dalam pemantauan jaringan, manajemen
            insiden, troubleshooting Level 1, dan operasional telekomunikasi 24/7.
          </p>

          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.open("mailto:tiarfirmansss@gmail.com")}>
              <Mail className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://www.linkedin.com/in/tiar-firman-syah-4b2706297", "_blank")}
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Tentang Saya</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Lulusan Teknik Jaringan Akses dan Telekomunikasi dari SMK Telkom Bandung dengan pengalaman pengelolaan
                data teknis OSP dan ISP, instalasi jaringan, pemeliharaan jaringan, pemantauan jaringan, penanganan
                insiden jaringan dan kolaborasi tim.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Memiliki minat dan aspirasi yang tinggi di bidang teknologi informasi dan juga telekomunikasi. Cepat
                dalam belajar, bertanggung jawab dan mampu memanage waktu dengan baik.
              </p>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">3+</div>
                  <div className="text-slate-600">Tahun Pengalaman</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2</div>
                  <div className="text-slate-600">Gelar</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
                  <div className="text-slate-600">Keahlian</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <User className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-slate-800">Nama</h4>
                      <p className="text-slate-600">Tiar Firman Syah</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-slate-800">Email</h4>
                      <p className="text-slate-600">tiarfirmansss@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-slate-800">Lokasi</h4>
                      <p className="text-slate-600">Bandung, Indonesia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Pengalaman Kerja</h2>

          <div className="space-y-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Helpdesk NOC (Network Operations Center)</h3>
                        <p className="text-emerald-600 font-semibold">PT PLN ICON+ SBU Jabar</p>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        <Calendar className="w-3 h-3 mr-1" />
                        Mei 2022 - Sekarang
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-6">
                      Sebagai Helpdesk NOC di PT PLN ICON+ SBU Jabar, peran utama saya adalah menjadi titik kontak
                      pertama bagi pelanggan atau pengguna internal terkait masalah jaringan dan layanan. Bertanggung
                      jawab untuk melakukan pemantauan proaktif, troubleshooting Level 1, dan eskalasi insiden untuk
                      memastikan layanan telekomunikasi dan jaringan berjalan optimal dalam lingkungan operasional 24/7.
                    </p>

                    {/* Main Responsibilities */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                          Penerimaan & Pencatatan Insiden
                        </h4>
                        <ul className="space-y-2 text-slate-600 ml-4">
                          <li className="flex items-start space-x-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>
                              Menerima laporan gangguan, keluhan, atau pertanyaan dari pelanggan/pengguna internal
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>
                              Merekam detail insiden secara akurat dan lengkap ke dalam sistem ticketing utama (ICRM+)
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>Memberikan nomor tiket kepada pelapor untuk tujuan pelacakan</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          Pemantauan & Analisis Awal Jaringan
                        </h4>
                        <ul className="space-y-2 text-slate-600 ml-4">
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>
                              Melakukan pemantauan real-time status jaringan menggunakan Zabbix, NMS Hariff, NMS
                              Sinergi, dan Monitoring Scada
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Mengidentifikasi anomali dan alert dari sistem pemantauan</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Melakukan analisa dan troubleshooting awal permasalahan jaringan secara mandiri</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                          Troubleshooting Level 1
                        </h4>
                        <ul className="space-y-2 text-slate-600 ml-4">
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Melakukan investigasi dan troubleshooting awal terhadap insiden yang dilaporkan</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                              Melakukan identifikasi, validasi, dan langkah-langkah troubleshooting sesuai SOP
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                              Melakukan konfigurasi perangkat jaringan sederhana (BDCOM, Fiberhome) sesuai instruksi dan
                              SOP
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                          Eskalasi & Koordinasi Insiden
                        </h4>
                        <ul className="space-y-2 text-slate-600 ml-4">
                          <li className="flex items-start space-x-2">
                            <span className="text-orange-600 mt-1">•</span>
                            <span>Mengevaluasi tingkat urgensi dan dampak insiden</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-orange-600 mt-1">•</span>
                            <span>
                              Melakukan eskalasi insiden yang tidak dapat diselesaikan pada level 1 kepada tim teknis
                              NOC
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-orange-600 mt-1">•</span>
                            <span>Berkoordinasi dengan tim NOC dalam menyelesaikan masalah</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                          Komunikasi & Dokumentasi
                        </h4>
                        <ul className="space-y-2 text-slate-600 ml-4">
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Berkomunikasi secara efektif dengan tim internal NOC dan tim terkait lainnya</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>
                              Memberikan pembaruan status secara berkala kepada pelapor mengenai progres penanganan
                              insiden
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Mendokumentasikan laporan/log sistem tiket (ICRM+) dan log komunikasi</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Membuat laporan penyelesaian tiket gangguan dan laporan tiket harian</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Magang</h3>
                        <p className="text-blue-600 font-semibold">PT PLN ICON+</p>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        <Calendar className="w-3 h-3 mr-1" />
                        Juni 2021 - Agustus 2022
                      </Badge>
                    </div>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Meningkatkan persentase input data OSP dan ISP sampai 60% pada akhir agustus 2022</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>
                          Melakukan pengecekan data baik data customer maupun data perangkat yang ada pada POP
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Memastikan informasi yang ada tercatat dengan akurat dan lengkap</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Pendidikan</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Teknik Informatika</h3>
                    <p className="text-emerald-600 font-semibold mb-2">Telkom University Bandung</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary">2022 - 2026</Badge>
                      <Badge className="bg-emerald-100 text-emerald-800">IPK: 3.75 / 4.00</Badge>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Mahasiswa semester 6 Teknik Informatika (PJJ) dengan pemahaman dalam pengembangan perangkat lunak,
                      analisis data, dan sistem jaringan.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Figma</Badge>
                      <Badge variant="outline">Java</Badge>
                      <Badge variant="outline">SQL</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Teknik Jaringan Akses Telekomunikasi</h3>
                    <p className="text-blue-600 font-semibold mb-2">SMK Telkom Bandung</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary">2018 - 2021</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Nilai: 88 / 100</Badge>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Lulusan dengan pengetahuan dasar dalam pemasangan, konfigurasi, dan pemeliharaan jaringan
                      telekomunikasi.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Fiber Optic</Badge>
                      <Badge variant="outline">FTTH</Badge>
                      <Badge variant="outline">Keamanan Jaringan</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">
            Keahlian Teknis & Profesional
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Sistem Monitoring</h3>
                <div className="space-y-3">
                  {["Zabbix", "NMS Hariff", "NMS Sinergi", "Monitoring Scada", "GSM Scada"].map((skill) => (
                    <div key={skill} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Perangkat Jaringan</h3>
                <div className="space-y-3">
                  {["BDCOM", "Fiberhome", "Zyxel", "Cisco ASR920"].map((skill) => (
                    <div key={skill} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Keahlian Teknis</h3>
                <div className="space-y-3">
                  {[
                    "OSI Layer",
                    "TCP/IP",
                    "Routing & Switching",
                    "Troubleshooting Level 1",
                    "Manajemen Insiden",
                    "ICRM+ Ticketing",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Soft Skills</h3>
                <div className="space-y-3">
                  {[
                    "Operasional 24/7",
                    "Layanan Pelanggan",
                    "Koordinasi Tim",
                    "Pemecahan Masalah",
                    "Dokumentasi",
                    "Komunikasi",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NOC Workflow Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">Alur Kerja & Proses NOC</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Alur Manajemen Tiket</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm">
                        1
                      </div>
                      <span className="text-slate-600">Penerimaan & Pencatatan di ICRM+</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        2
                      </div>
                      <span className="text-slate-600">Analisa & Troubleshooting Level 1</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                        3
                      </div>
                      <span className="text-slate-600">Eskalasi atau Penyelesaian</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                        4
                      </div>
                      <span className="text-slate-600">Dokumentasi & Pelaporan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Tanggung Jawab Harian</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                      <span className="text-slate-600">Pemantauan jaringan real-time</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <span className="text-slate-600">Respons insiden & eskalasi</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-slate-600">Komunikasi dengan pelanggan</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <span className="text-slate-600">Pelaporan harian & bulanan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Portfolio Kerja</h2>

          <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Berikut adalah dokumentasi dan bukti kerja saya selama bertugas sebagai Helpdesk NOC di PT PLN ICON+ SBU
            Jabar. Portfolio ini menunjukkan pengalaman praktis dalam sistem ticketing, monitoring jaringan, pelaporan,
            dan konfigurasi perangkat.
          </p>

          {/* Portfolio Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {portfolioTabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePortfolioTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activePortfolioTab === tab.id
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <Badge variant={activePortfolioTab === tab.id ? "secondary" : "outline"} className="ml-1">
                    {tab.count}
                  </Badge>
                </button>
              )
            })}
          </div>

          {/* Portfolio Content */}
          <div className="min-h-[400px]">
            {activePortfolioTab === "ticketing" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Sistem Ticketing ICRM+</h3>
                <p className="text-slate-600 text-center mb-8">
                  Dokumentasi lengkap alur kerja sistem ticketing ICRM+ mulai dari tampilan dashboard, pembukaan tiket,
                  proses analisa, eskalasi, hingga penutupan tiket. Menunjukkan pengalaman praktis dalam manajemen
                  insiden dan troubleshooting Level 1.
                </p>
                {renderPortfolioImages("ticketing", 5)}
              </div>
            )}

            {activePortfolioTab === "reports" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Laporan Kerja</h3>
                <p className="text-slate-600 text-center mb-8">
                  Contoh laporan harian dan bulanan yang saya buat untuk dokumentasi kinerja dan statistik penanganan
                  insiden.
                </p>
                {renderPortfolioImages("laporan", 1)}
              </div>
            )}

            {activePortfolioTab === "monitoring" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Sistem Monitoring Jaringan</h3>
                <p className="text-slate-600 text-center mb-8">
                  Screenshot dari berbagai sistem monitoring yang saya gunakan: Zabbix, NMS Hariff, NMS Sinergi, dan
                  Monitoring Scada.
                </p>
                {renderPortfolioImages("monitoring", 5)}
              </div>
            )}

            {activePortfolioTab === "config" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Konfigurasi Perangkat</h3>
                <p className="text-slate-600 text-center mb-8">
                  Bukti konfigurasi perangkat jaringan seperti BDCOM, Fiberhome, dan perangkat lainnya sesuai SOP.
                </p>
                {renderPortfolioImages("konfigurasi", 4)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Kontak</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Mari Terhubung</h3>
              <p className="text-lg text-slate-600 mb-8">
                Saya selalu tertarik dengan peluang dan kolaborasi baru. Jangan ragu untuk menghubungi saya!
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email</h4>
                    <a href="mailto:tiarfirmansss@gmail.com" className="text-emerald-600 hover:underline">
                      tiarfirmansss@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Lokasi</h4>
                    <p className="text-slate-600">Jl. Pamitran 3 No 16, RT 04/09, Panyileukan, Kota Bandung</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://www.linkedin.com/in/tiar-firman-syah-4b2706297", "_blank")}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nama Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="email.anda@contoh.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subjek</label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Subjek"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pesan</label>
                    <textarea
                      rows={4}
                      name="message"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Pesan Anda..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">© 2025 Tiar Firman Syah. Hak cipta dilindungi.</p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("mailto:tiarfirmansss@gmail.com")}
                className="text-slate-400 hover:text-white"
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("https://www.linkedin.com/in/tiar-firman-syah-4b2706297", "_blank")}
                className="text-slate-400 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
