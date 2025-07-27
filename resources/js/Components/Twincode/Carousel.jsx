import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const slides = [
        {
            title: "Compare Códigos com Precisão",
            description: (<p>O <strong>TwinCode</strong> é uma ferramenta acadêmica projetada para análise comparativa de códigos-fonte em múltiplas linguagens. Ideal para pesquisas em engenharia de software, educação computacional e estudos de práticas de desenvolvimento.</p>),
        },
        {
            title: "Funcionalidades que Transformam Pesquisas",
            description: (<ul className="list-disc list-inside">
                <li>Comparação lado a lado de códigos em Python, Java, JavaScript, C++ e mais.</li>
                <li>Questionários estruturados para coletar insights dos entrevistados.</li>
                <li>Dashboards dinâmicos para monitorar respostas e gerar relatórios detalhados.</li>
                <li>Exportação de dados em formatos CSV e JSON para fácil análise.</li>
            </ul>),
        },
        {
            title: "Participe da Revolução na Análise de Código",
            description: (<p>Cadastre-se para participar das pesquisas, contribuir com o projeto ou acessar bases de dados anonimizadas.
<strong>TwinCode</strong>: Ferramentas para ciência e educação em programação.</p>),
        },
        {
            title: "Para Pesquisas que Movem a Ciência",
            description: (<ul className="list-disc list-inside">
                <li>Legibilidade e eficiência de códigos.</li>
                <li>Análise de decisões técnicas em equipes de desenvolvimento.</li>
                <li>Tendências em práticas de programação.</li>
            </ul>),
        },
    ];

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) goToNext(); // Swipe esquerda
        if (touchEnd - touchStart > 50) goToPrevious(); // Swipe direita
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div
            className="relative w-full lg:w-6xl mx-auto overflow-hidden  rounded-2xl h-2/3"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Conteúdo dos slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="min-w-full flex items-center justify-center p-8">
                        <div className="text-center max-w-2xl">
                            <h2 className="text-2xl font-semibold text-neutral-600 mb-6">{slide.title}</h2>
                            <p className="text-neutral-600 text-lg">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botões de navegação */}
            <button
                className="absolute top-1/2 -translate-y-1/2 -left-1 lg:left-4 p-2 bg-neutral-600 text-white rounded-full hover:bg-neutral-700 focus:outline-none shadow-lg"
                onClick={goToPrevious}
                aria-label="Slide anterior"
            >
                <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="size-6"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
            </button>
            <button
                className="absolute top-1/2 -translate-y-1/2 -right-1 lg:right-4 p-2 bg-neutral-600 text-white rounded-full hover:bg-neutral-700 focus:outline-none shadow-lg"
                onClick={goToNext}
                aria-label="Próximo slide"
            >
                <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="size-6"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 -mb-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`size-3 rounded-full ${index === currentIndex ? 'bg-neutral-600' : 'bg-neutral-300'
                            }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir para slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
