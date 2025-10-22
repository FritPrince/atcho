import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    // Protection contre les données utilisateur manquantes
    const userName = user?.name || 'Utilisateur';
    const userEmail = user?.email || '';
    const userAvatar = user?.avatar;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(userName)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                {showEmail && userEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {userEmail}
                    </span>
                )}
            </div>
        </>
    );
}
