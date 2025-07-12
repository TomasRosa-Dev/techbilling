import { useTheme } from 'next-themes';
import { Switch } from './switch';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = async (checked: boolean) => {
    setIsToggling(true);
    
    setTimeout(() => {
      setTheme(checked ? 'dark' : 'light');
      setIsToggling(false);
    }, 150);
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <div className="flex items-center gap-2">
        <Sun className={`h-4 w-4 transition-all duration-300 ${
          theme === 'dark' 
            ? 'text-muted-foreground/50 scale-90' 
            : 'text-yellow-500 scale-100'
        }`} />
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={handleThemeChange}
          disabled={isToggling}
          className="transition-all duration-300 ease-in-out"
        />
        <Moon className={`h-4 w-4 transition-all duration-300 ${
          theme === 'dark' 
            ? 'text-blue-400 scale-100' 
            : 'text-muted-foreground/50 scale-90'
        }`} />
      </div>
    </div>
  );
}