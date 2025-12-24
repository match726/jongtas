import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FunctionCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: "primary" | "secondary" | "accent"
}

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary-foreground",
  accent: "bg-accent/10 text-accent-foreground",
}

export function FunctionCard({ title, description, icon: Icon, href, color }: FunctionCardProps) {
  return (
    <Link to={href}>
      <Card className="h-full border border-border/50 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 cursor-pointer overflow-hidden group">
        <div className="p-6 space-y-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]} transition-transform group-hover:scale-110 duration-200`}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>

          {/* Arrow Indicator */}
          <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>詳細を見る</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div
          className={`h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity`}
        />
      </Card>
    </Link>
  )
}
