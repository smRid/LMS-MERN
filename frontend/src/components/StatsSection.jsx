import { useEffect, useRef, useState } from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: 10000,
        suffix: '+',
        label: 'Happy Students',
        color: 'from-indigo-500 to-purple-500',
        bgColor: 'from-indigo-50 to-purple-50'
    },
    {
        icon: BookOpen,
        value: 500,
        suffix: '+',
        label: 'Quality Courses',
        color: 'from-pink-500 to-rose-500',
        bgColor: 'from-pink-50 to-rose-50'
    },
    {
        icon: Award,
        value: 50,
        suffix: '+',
        label: 'Expert Instructors',
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'from-emerald-50 to-teal-50'
    },
    {
        icon: TrendingUp,
        value: 95,
        suffix: '%',
        label: 'Success Rate',
        color: 'from-amber-500 to-orange-500',
        bgColor: 'from-amber-50 to-orange-50'
    }
];

// Animated counter hook
const useCountUp = (end, duration = 2000, startOnView = true) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!startOnView) {
            setHasStarted(true);
        }
    }, [startOnView]);

    useEffect(() => {
        if (!startOnView || hasStarted) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [startOnView, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasStarted]);

    return { count, ref };
};

const StatCard = ({ stat, index }) => {
    const { count, ref } = useCountUp(stat.value, 2000 + index * 200);
    const Icon = stat.icon;

    return (
        <div
            ref={ref}
            className="group relative animate-slide-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Glow background */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />

            {/* Card */}
            <div className={`relative bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}>
                {/* Decorative circle */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Counter */}
                <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {count.toLocaleString()}
                    </span>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.suffix}
                    </span>
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
            </div>
        </div>
    );
};

const StatsSection = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-indigo-50/30 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-particle" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-particle animation-delay-500" />

            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full text-indigo-600 text-sm font-semibold mb-4 border border-indigo-200/50">
                        <TrendingUp className="w-4 h-4" />
                        Our Achievements
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-rainbow-shimmer mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our growing community of learners and transform your career with in-demand skills
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
