"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Search,
  LogOut,
  Sparkles,
  Check,
  X,
  Ruler,
  TreePine,
  Image as ImageIcon,
  AlertCircle,
  ShieldCheck,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, getCategoryName } from "@/lib/utils";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  lengthCm?: number | null;
  widthCm?: number | null;
  heightCm?: number | null;
  material?: string | null;
  customizable: boolean;
  isFeatured: boolean;
  priceNote?: string | null;
  description: string;
  tags: string;
  images: { id?: string; url: string }[];
}

export function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "avdar",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    material: "",
    customizable: true,
    isFeatured: false,
    priceNote: "",
    description: "",
    tags: "",
    imageUrl: "/uploads/avdar-ulzii-satin.jpg",
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch products & verify auth
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      if (res.status === 401) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Нууц үг буруу байна");
      }

      setIsAuthenticated(true);
      await loadProducts();
    } catch (err: any) {
      setLoginError(err.message || "Нэвтрэхэд алдаа гарлаа");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "avdar",
      lengthCm: "",
      widthCm: "",
      heightCm: "",
      material: "",
      customizable: true,
      isFeatured: false,
      priceNote: "",
      description: "",
      tags: "",
      imageUrl: "/uploads/avdar-ulzii-satin.jpg",
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      lengthCm: p.lengthCm ? p.lengthCm.toString() : "",
      widthCm: p.widthCm ? p.widthCm.toString() : "",
      heightCm: p.heightCm ? p.heightCm.toString() : "",
      material: p.material || "",
      customizable: p.customizable,
      isFeatured: p.isFeatured,
      priceNote: p.priceNote || "",
      description: p.description,
      tags: p.tags,
      imageUrl: p.images[0]?.url || "/uploads/avdar-ulzii-satin.jpg",
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Зураг оруулахад алдаа гарлаа");
      }

      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (err: any) {
      alert(err.message || "Зураг оруулах амжилтгүй боллоо");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const url = "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";
      const payload = {
        id: editingProduct?.id,
        ...formData,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Алдаа гарлаа");
      }

      setIsModalOpen(false);
      await loadProducts();
    } catch (err: any) {
      setErrorMsg(err.message || "Хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Устгахад алдаа гарлаа");
      setDeleteConfirmId(null);
      await loadProducts();
    } catch (err: any) {
      alert(err.message || "Устгах үйлдэл амжилтгүй");
    }
  };

  // If checking authentication
  if (isAuthenticated === null && loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-brand-muted">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  // If NOT authenticated -> Show Clean Login Card directly
  if (isAuthenticated === false) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-brand-card p-8 sm:p-10 rounded-2xl border border-brand-border shadow-warm">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-gold flex items-center justify-center mx-auto mb-4 font-serif font-bold text-xl">
              Н
            </div>
            <h1 className="font-serif font-bold text-2xl text-brand-dark">
              Админ нэвтрэх
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Бүтээгдэхүүн удирдах хэсэг (Локал SQLite)
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                Админ Нууц үг
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Нууц үгээ оруулна уу..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-brand-bg border border-brand-border text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <p className="text-[11px] text-brand-muted mt-1.5">
                * Анхдагч нууц үг: <code className="bg-brand-border/40 px-1 py-0.5 rounded text-brand-dark font-mono font-bold">nomad2026</code>
              </p>
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              variant="primary"
              size="lg"
              fullWidth
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {loginLoading ? "Шалгаж байна..." : "Нэвтрэх"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q) ||
        (p.material || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-gold/15 text-brand-gold">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-dark">
              Админ Удирдлагын Самбар
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Локал SQLite өгөгдлийн сан (`prisma/dev.db`) руу бүтээгдэхүүн удирдах
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          <Button
            onClick={openAddModal}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            className="flex-1 sm:flex-initial"
          >
            Бүтээгдэхүүн нэмэх
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="md"
            icon={<LogOut className="w-4 h-4" />}
            className="text-xs text-brand-muted hover:text-brand-red"
          >
            Гарах
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-brand-card border border-brand-border shadow-warm">
          <p className="text-xs text-brand-muted">Нийт бүтээгдэхүүн</p>
          <p className="font-serif font-bold text-2xl text-brand-dark mt-1">
            {products.length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-brand-card border border-brand-border shadow-warm">
          <p className="text-xs text-brand-muted">Авдар</p>
          <p className="font-serif font-bold text-2xl text-brand-gold mt-1">
            {products.filter((p) => p.category === "avdar").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-brand-card border border-brand-border shadow-warm">
          <p className="text-xs text-brand-muted">Модон тавилга</p>
          <p className="font-serif font-bold text-2xl text-brand-dark mt-1">
            {products.filter((p) => p.category === "wood_item").length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-brand-card border border-brand-border shadow-warm">
          <p className="text-xs text-brand-muted">Бэлэг дурсгал</p>
          <p className="font-serif font-bold text-2xl text-brand-dark mt-1">
            {products.filter((p) => p.category === "gift").length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-brand-card p-4 rounded-xl border border-brand-border">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Нэр, түлхүүр үгээр хайх..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
          />
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`tap-target flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-brand-dark text-white"
                  : "bg-brand-bg text-brand-dark border border-brand-border hover:bg-brand-border/40"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-brand-card rounded-2xl border border-brand-border shadow-warm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-brand-muted">Уншиж байна...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-brand-muted">
            Бүтээгдэхүүн олдсонгүй
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-bg/80 border-b border-brand-border text-xs uppercase font-semibold text-brand-muted">
                <tr>
                  <th className="px-5 py-3.5">Зураг & Нэр</th>
                  <th className="px-4 py-3.5">Ангилал</th>
                  <th className="px-4 py-3.5">Хэмжээ (У×Ө×Ө)</th>
                  <th className="px-4 py-3.5">Материал</th>
                  <th className="px-4 py-3.5 text-center">Захиалга</th>
                  <th className="px-5 py-3.5 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-bg/40 transition-colors">
                    {/* Image & Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-brand-border flex-shrink-0 bg-brand-bg">
                          <Image
                            src={p.images[0]?.url || "/uploads/avdar-ulzii-satin.jpg"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-brand-dark text-base line-clamp-1">
                            {p.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {p.isFeatured && (
                              <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-brand-gold/20 text-brand-gold">
                                Онцлох
                              </span>
                            )}
                            <span className="text-xs text-brand-muted">
                              slug: {p.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-border/50 text-brand-dark">
                        {getCategoryName(p.category)}
                      </span>
                    </td>

                    {/* Dimensions */}
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-brand-muted">
                      {p.lengthCm || p.widthCm || p.heightCm ? (
                        <span>
                          {p.lengthCm ?? "-"} × {p.widthCm ?? "-"} × {p.heightCm ?? "-"} см
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Material */}
                    <td className="px-4 py-4 text-xs text-brand-muted max-w-[180px] truncate">
                      {p.material || "-"}
                    </td>

                    {/* Customizable */}
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      {p.customizable ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5" /> Тийм
                        </span>
                      ) : (
                        <span className="text-xs text-brand-muted">Үгүй</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="tap-target p-2 text-brand-muted hover:text-brand-dark rounded-lg hover:bg-brand-border/40"
                          title="Сайт дээр харах"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(p)}
                          className="tap-target p-2 text-brand-gold hover:text-brand-goldHover rounded-lg hover:bg-brand-gold/10"
                          title="Засах"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="tap-target p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                          title="Устгах"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-card w-full max-w-2xl rounded-2xl border border-brand-border shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
              <h3 className="font-serif font-bold text-xl text-brand-dark">
                {editingProduct ? "Бүтээгдэхүүн засах" : "Шинэ бүтээгдэхүүн нэмэх"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="tap-target p-2 text-brand-muted hover:text-brand-dark rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Бүтээгдэхүүний нэр *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Жишээ: Угалзан сийлбэртэй хойморын авдар"
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Category & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Ангилал *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                  >
                    <option value="avdar">Авдар (avdar)</option>
                    <option value="wood_item">Модон эдлэл, тавилга (wood_item)</option>
                    <option value="gift">Бэлэг дурсгал, сийлбэр (gift)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Материал
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="Жишээ: Цул нарс, хуш мод, гуулин тоног"
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Dimensions: Length, Width, Height */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Урт (см)
                  </label>
                  <input
                    type="number"
                    value={formData.lengthCm}
                    onChange={(e) => setFormData({ ...formData, lengthCm: e.target.value })}
                    placeholder="100"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Өргөн (см)
                  </label>
                  <input
                    type="number"
                    value={formData.widthCm}
                    onChange={(e) => setFormData({ ...formData, widthCm: e.target.value })}
                    placeholder="50"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Өндөр (см)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                    placeholder="60"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Price Note */}
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Үнийн санамж / Тайлбар
                </label>
                <input
                  type="text"
                  value={formData.priceNote}
                  onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                  placeholder="Жишээ: Захиалгын хэмжээ, сийлбэрээс хамаарна"
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Image Upload & Preview */}
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Зураг (Компьютерээсээ зураг оруулах)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-brand-border bg-brand-bg flex-shrink-0">
                    {formData.imageUrl ? (
                      <Image
                        src={formData.imageUrl}
                        alt="Урьдчилан харах"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="tap-target px-4 py-2 rounded-lg bg-brand-bg border border-brand-border text-xs font-semibold text-brand-dark hover:border-brand-gold cursor-pointer inline-flex items-center gap-2">
                      <Upload className="w-4 h-4 text-brand-gold" />
                      <span>{uploadingImage ? "Хуулж байна..." : "Шинэ зураг сонгох"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-brand-muted mt-1">
                      Зураг шууд таны компьютерийн `/public/uploads` хавтсанд хадгалагдана.
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Дэлгэрэнгүй тайлбар *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Бүтээгдэхүүний гар урлалын онцлог, хээ угалз, ашигласан мод..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Түлхүүр үгс (Таслалаар зааглах)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="авдар, сийлбэр, монгол гэр, хоймор"
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-brand-bg border border-brand-border text-brand-dark focus:outline-none focus:border-brand-gold"
                />
              </div>

              {/* Checkboxes: Customizable, isFeatured */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-brand-dark">
                  <input
                    type="checkbox"
                    checked={formData.customizable}
                    onChange={(e) =>
                      setFormData({ ...formData, customizable: e.target.checked })
                    }
                    className="w-4 h-4 text-brand-gold rounded border-brand-border focus:ring-brand-gold"
                  />
                  <span>Хүссэн хэмжээгээр хийлгэх боломжтой</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-brand-dark">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 text-brand-gold rounded border-brand-border focus:ring-brand-gold"
                  />
                  <span>Нүүр хуудсанд онцлох</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-brand-border">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  size="md"
                >
                  Болих
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  variant="primary"
                  size="md"
                >
                  {saving ? "Хадгалж байна..." : "Хадгалах"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card w-full max-w-sm rounded-2xl border border-brand-border shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-dark">
              Устгахдаа итгэлтэй байна уу?
            </h3>
            <p className="text-xs text-brand-muted">
              Энэ бүтээгдэхүүний өгөгдөл локал SQLite сангаас бүрмөсөн устах болно.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={() => setDeleteConfirmId(null)}
                variant="outline"
                size="md"
                fullWidth
              >
                Болих
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                variant="danger"
                size="md"
                fullWidth
              >
                Устгах
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
