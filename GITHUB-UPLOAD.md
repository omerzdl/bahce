# GitHub'a Yükleme Talimatları

## Git Kurulumu

Eğer Git yüklü değilse:

1. [Git'i indirin](https://git-scm.com/download/win)
2. Kurulumu yapın (varsayılan ayarları kabul edin)
3. Bilgisayarı yeniden başlatın

## GitHub'a Yükleme Adımları

### 1. Git Repository'sini Başlat

PowerShell veya CMD'de proje klasörüne gidin ve şu komutları çalıştırın:

```bash
# Git repository'sini başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit'i yap
git commit -m "Initial commit: Dual-mode Bar & Meyhane website"
```

### 2. GitHub Repository'sini Bağla

```bash
# Remote repository'yi ekle
git remote add origin https://github.com/omerzdl/bahce.git

# Branch'i main olarak ayarla
git branch -M main

# Dosyaları GitHub'a gönder
git push -u origin main
```

### 3. GitHub Kimlik Doğrulama

İlk push'ta GitHub kullanıcı adı ve şifreniz istenecek. 

**Önemli:** Eğer 2FA (İki Faktörlü Doğrulama) aktifse, şifre yerine **Personal Access Token** kullanmanız gerekebilir.

#### Personal Access Token Oluşturma:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. Note: "bahce-project" yazın
4. Scopes: `repo` seçeneğini işaretleyin
5. "Generate token" butonuna tıklayın
6. Token'ı kopyalayın (bir daha gösterilmeyecek!)
7. Push yaparken şifre yerine bu token'ı kullanın

## Alternatif: GitHub Desktop Kullanımı

Daha kolay bir yöntem için [GitHub Desktop](https://desktop.github.com/) kullanabilirsiniz:

1. GitHub Desktop'ı indirin ve kurun
2. File → Add Local Repository
3. Proje klasörünü seçin
4. "Publish repository" butonuna tıklayın
5. Repository adını "bahce" olarak ayarlayın
6. "Publish repository" butonuna tıklayın

## Hızlı Komutlar (Tümü Bir Arada)

```bash
git init
git add .
git commit -m "Initial commit: Dual-mode Bar & Meyhane website"
git remote add origin https://github.com/omerzdl/bahce.git
git branch -M main
git push -u origin main
```

## Sonraki Güncellemeler İçin

Projede değişiklik yaptıktan sonra:

```bash
git add .
git commit -m "Açıklayıcı commit mesajı"
git push
```

## Sorun Giderme

### "remote origin already exists" Hatası

```bash
git remote remove origin
git remote add origin https://github.com/omerzdl/bahce.git
```

### "Authentication failed" Hatası

- Personal Access Token kullanmayı deneyin
- GitHub Desktop kullanmayı düşünün

### "Permission denied" Hatası

- GitHub hesabınızın repository'ye erişim yetkisi olduğundan emin olun
- Repository'nin public veya private olduğunu kontrol edin

