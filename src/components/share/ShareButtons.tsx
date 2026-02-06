import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Share2, Facebook, Twitter, Linkedin, Link2, MessageCircle, Mail, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  description?: string;
  url?: string;
  className?: string;
}

export function ShareButtons({ title, description = '', url, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'تم النسخ!',
        description: 'تم نسخ الرابط إلى الحافظة',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'خطأ',
        description: 'فشل في نسخ الرابط',
        variant: 'destructive',
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  // Check if native share is available (mobile)
  const canNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Native share button for mobile */}
      {canNativeShare && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">مشاركة</span>
        </Button>
      )}

      {/* Desktop share dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">مشاركة</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleShare('twitter')} className="gap-3 cursor-pointer flex-row-reverse">
            <Twitter className="h-4 w-4 text-sky-500" />
            <span>تويتر / X</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('facebook')} className="gap-3 cursor-pointer flex-row-reverse">
            <Facebook className="h-4 w-4 text-blue-600" />
            <span>فيسبوك</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('linkedin')} className="gap-3 cursor-pointer flex-row-reverse">
            <Linkedin className="h-4 w-4 text-blue-700" />
            <span>لينكد إن</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="gap-3 cursor-pointer flex-row-reverse">
            <MessageCircle className="h-4 w-4 text-green-500" />
            <span>واتساب</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('telegram')} className="gap-3 cursor-pointer flex-row-reverse">
            <svg className="h-4 w-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span>تليجرام</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('email')} className="gap-3 cursor-pointer flex-row-reverse">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>البريد الإلكتروني</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink} className="gap-3 cursor-pointer flex-row-reverse">
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Link2 className="h-4 w-4 text-muted-foreground" />
            )}
            <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
