
/* ==========================================
   KILLINCHA PRODUCCIONES
   JAVASCRIPT PRINCIPAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       1. MENÚ RESPONSIVE
    ====================================== */

    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            const abierto = navbar.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                String(abierto)
            );

            menuBtn.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );

            menuBtn.innerHTML = abierto
                ? "&times;"
                : "&#9776;";
        });

        document.querySelectorAll(".navbar a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Abrir menú");
                menuBtn.innerHTML = "&#9776;";
            });
        });
    }


    /* ======================================
       2. CARRUSEL HORIZONTAL DE MARCAS
    ====================================== */

    const marcasTrack = document.getElementById("marcasTrack");
    const marcasSlider = document.querySelector(".marcas-slider");

    if (marcasTrack && marcasSlider) {

        const originales = Array.from(marcasTrack.children);

        if (originales.length > 1) {

            originales.forEach(marca => {

                const copia = marca.cloneNode(true);
                copia.setAttribute("aria-hidden", "true");
                marcasTrack.appendChild(copia);
            });

            let indice = 0;
            let intervaloMarcas = null;
            let animandoMarcas = false;
            let mouseEncima = false;

            function avanzarMarca() {

                if (animandoMarcas) return;

                const anchoMarca =
                    originales[0].getBoundingClientRect().width;

                const estilos = getComputedStyle(marcasTrack);
                const espacio = parseFloat(estilos.columnGap) || 0;

                const paso = anchoMarca + espacio;

                indice++;
                animandoMarcas = true;

                marcasTrack.style.transition =
                    "transform 0.65s ease";

                marcasTrack.style.transform =
                    `translateX(-${indice * paso}px)`;
            }

            marcasTrack.addEventListener("transitionend", evento => {

                if (
                    evento.target !== marcasTrack ||
                    evento.propertyName !== "transform"
                ) return;

                if (indice >= originales.length) {

                    marcasTrack.style.transition = "none";
                    marcasTrack.style.transform = "translateX(0)";
                    indice = 0;
                }

                animandoMarcas = false;
            });

            function iniciarMarcas() {

                if (
                    intervaloMarcas !== null ||
                    document.hidden ||
                    mouseEncima
                ) return;

                intervaloMarcas = setInterval(avanzarMarca, 2000);
            }

            function detenerMarcas() {

                clearInterval(intervaloMarcas);
                intervaloMarcas = null;
            }

            iniciarMarcas();

            marcasSlider.addEventListener("mouseenter", () => {

                mouseEncima = true;
                detenerMarcas();
            });

            marcasSlider.addEventListener("mouseleave", () => {

                mouseEncima = false;
                iniciarMarcas();
            });

            document.addEventListener("visibilitychange", () => {

                if (document.hidden) {
                    detenerMarcas();
                } else {
                    iniciarMarcas();
                }
            });
        }
    }


    /* ======================================
       3. RULETA VERTICAL - CONÓCENOS
    ====================================== */

    const palabrasTrack =
        document.getElementById("palabrasTrack");

    if (palabrasTrack) {

        const palabrasOriginales =
            Array.from(palabrasTrack.children);

        if (palabrasOriginales.length > 1) {

            const primeraCopia =
                palabrasOriginales[0].cloneNode(true);

            primeraCopia.setAttribute("aria-hidden", "true");

            palabrasTrack.appendChild(primeraCopia);

            let indicePalabra = 0;
            let intervaloPalabras = null;
            let animandoPalabra = false;

            function avanzarPalabra() {

                if (animandoPalabra) return;

                const altura =
                    palabrasOriginales[0].getBoundingClientRect().height;

                indicePalabra++;
                animandoPalabra = true;

                palabrasTrack.style.transition =
                    "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

                palabrasTrack.style.transform =
                    `translateY(-${indicePalabra * altura}px)`;
            }

            palabrasTrack.addEventListener("transitionend", evento => {

                if (
                    evento.target !== palabrasTrack ||
                    evento.propertyName !== "transform"
                ) return;

                if (indicePalabra >= palabrasOriginales.length) {

                    palabrasTrack.style.transition = "none";
                    palabrasTrack.style.transform = "translateY(0)";
                    indicePalabra = 0;
                }

                animandoPalabra = false;
            });

            function iniciarPalabras() {

                if (
                    intervaloPalabras !== null ||
                    document.hidden
                ) return;

                intervaloPalabras = setInterval(avanzarPalabra, 2500);
            }

            function detenerPalabras() {

                clearInterval(intervaloPalabras);
                intervaloPalabras = null;
            }

            iniciarPalabras();

            document.addEventListener("visibilitychange", () => {

                if (document.hidden) {
                    detenerPalabras();
                } else {
                    iniciarPalabras();
                }
            });
        }
    }


    /* ======================================
       4. CARRUSEL DE PROYECTOS REALIZADOS
    ====================================== */

    const proyectosTrack =
        document.getElementById("proyectosTrack");

    const indicadores =
        document.getElementById("proyectosIndicadores");

    const seccion = document.querySelector(".proyectos");

    if (proyectosTrack && indicadores && seccion) {

        const tarjetas = Array.from(
            proyectosTrack.querySelectorAll(".proyecto-card")
        );

        const anterior = seccion.querySelector(
            ".proyectos-flecha.anterior"
        );

        const siguiente = seccion.querySelector(
            ".proyectos-flecha.siguiente"
        );

        let indice = 0;
        let intervalo = null;

        const movimientoReducido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        /* Dos tarjetas en PC, una en celular */

        function visibles() {
            return window.innerWidth <= 768 ? 1 : 2;
        }

        function maxIndice() {
            return Math.max(0, tarjetas.length - visibles());
        }

        function distancia() {

            if (!tarjetas.length) return 0;

            const estilos = window.getComputedStyle(proyectosTrack);

            const espacio =
                parseFloat(estilos.columnGap) || 0;

            return tarjetas[0].getBoundingClientRect().width
                + espacio;
        }

        function actualizar() {

            indice = Math.max(
                0,
                Math.min(indice, maxIndice())
            );

            proyectosTrack.style.transform =
                `translateX(-${indice * distancia()}px)`;

            Array.from(indicadores.children).forEach(
                (punto, posicion) => {

                    const activo = posicion === indice;

                    punto.classList.toggle("activo", activo);

                    punto.setAttribute(
                        "aria-current",
                        activo ? "true" : "false"
                    );
                }
            );
        }

        function crearIndicadores() {

            indicadores.innerHTML = "";

            for (let i = 0; i <= maxIndice(); i++) {

                const punto = document.createElement("button");

                punto.type = "button";

                punto.setAttribute(
                    "aria-label",
                    `Mostrar proyecto ${i + 1}`
                );

                punto.addEventListener("click", () => {

                    indice = i;
                    actualizar();
                    reiniciar();
                });

                indicadores.appendChild(punto);
            }

            actualizar();
        }

        function avanzar() {

            indice = indice >= maxIndice()
                ? 0
                : indice + 1;

            actualizar();
        }

        function retroceder() {

            indice = indice <= 0
                ? maxIndice()
                : indice - 1;

            actualizar();
        }

        function detener() {

            clearInterval(intervalo);
            intervalo = null;
        }

        function iniciar() {

            detener();

            if (
                document.hidden ||
                movimientoReducido.matches ||
                tarjetas.length <= visibles() ||
                seccion.matches(":hover") ||
                seccion.contains(document.activeElement)
            ) return;

            intervalo = setInterval(avanzar, 5000);
        }

        function reiniciar() {
            iniciar();
        }

        if (anterior) {

            anterior.addEventListener("click", () => {

                retroceder();
                reiniciar();
            });
        }

        if (siguiente) {

            siguiente.addEventListener("click", () => {

                avanzar();
                reiniciar();
            });
        }

        /* Pausar al pasar el mouse */

        seccion.addEventListener("mouseenter", detener);
        seccion.addEventListener("mouseleave", iniciar);

        /* Pausar al usar el teclado */

        seccion.addEventListener("focusin", detener);

        seccion.addEventListener("focusout", evento => {

            if (!seccion.contains(evento.relatedTarget)) {
                iniciar();
            }
        });

        /* Pausar cuando la pestaña no está visible */

        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {
                detener();
            } else {
                iniciar();
            }
        });

        /* Adaptar el carrusel al tamaño de pantalla */

        window.addEventListener("resize", () => {

            crearIndicadores();
            iniciar();
        });

        crearIndicadores();
        iniciar();
    }


    /* ======================================
       5. AÑO AUTOMÁTICO DEL FOOTER
    ====================================== */

    const footerYear =
        document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

});
