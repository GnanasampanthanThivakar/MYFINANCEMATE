import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialProps {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export function Testimonial({ quote, author, role, avatarUrl }: TestimonialProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="mb-4 text-4xl text-primary">"</div>
        <p className="text-lg">{quote}</p>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={author} />
            <AvatarFallback>
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

