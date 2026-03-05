async function loadTutorial() {
    const res = await fetch("./tutorial.md");
    const md = await res.text();

    const html = marked.parse(md);
    document.getElementById("tutorial").innerHTML = html;

    buildSteps();
    buildSidebar();
}

function buildSteps() {
    const tutorial = document.getElementById("tutorial");
    const nodes = Array.from(tutorial.childNodes);

    tutorial.innerHTML = "";

    let step = null;
    let stepIndex = 0;

    nodes.forEach(node => {
        if (node.nodeType === 1 && node.tagName === "H2") {

            stepIndex++;

            let newDiv = document.createElement("div");

            step = newDiv;
            step.className = "step";
            step.id = "step-" + stepIndex;

            const expandButton = document.createElement("button");
            expandButton.className = "toggle-btn";
            expandButton.setAttribute("aria-expanded", "false");
            expandButton.innerHTML = `<svg class="icon" viewBox="0 0 24 24">
                <path d="M8 5l8 7-8 7"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
            </svg>`;

            const buttonWrapper = document.createElement("span");
            buttonWrapper.className = "expand-button-wrapper";
            buttonWrapper.appendChild(expandButton);

            const textNode = document.createTextNode(
            ` Step ${stepIndex}: ${node.innerText}`
            );

            const header = document.createElement("h2");
            header.appendChild(buttonWrapper);
            header.appendChild(textNode);

            const body = document.createElement("div");
            body.className = "step-body";

            step.appendChild(header);
            step.appendChild(body);
            tutorial.appendChild(step);

            expandButton.addEventListener("click", () => {
                const isCollapsed = newDiv.classList.toggle("collapsed");
                expandButton.classList.toggle("is-open");
                expandButton.setAttribute("aria-expanded", !isCollapsed);

                if (isCollapsed) {
                    // COLLAPSE
                    // Lock current height first
                    body.style.maxHeight = body.scrollHeight + "px";

                    // Animate to 0 in next frame
                    requestAnimationFrame(() => {
                        body.style.maxHeight = "0px";
                    });

                } else {
                    // EXPAND
                    body.style.maxHeight = body.scrollHeight + "px";

                    // After transition, remove inline height for natural resizing
                    body.addEventListener(
                    "transitionend",
                    () => {
                        if (!newDiv.classList.contains("collapsed")) {
                            body.style.maxHeight = "none";
                        }
                    },
                    { once: true }
                    );
                }
            });
        } else if (step) {
            step.querySelector(".step-body").appendChild(node);
        }
    });
}

function buildSidebar() {
    const nav = document.getElementById("stepNav");
    const steps = document.querySelectorAll(".step");

    steps.forEach((step, i) => {
        const title = step.querySelector("h2").innerText;

        const link = document.createElement("a");
        link.href = "#step-" + (i + 1);
        link.textContent = title;

        link.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.getElementById("step-" + (i + 1));
            const y = target.getBoundingClientRect().top + window.scrollY - 70;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        });

        nav.appendChild(link);
    });
}

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase().trim();

  document.querySelectorAll(".step").forEach(step => {
    const body = step.querySelector(".step-body");
    const matches = step.innerText.toLowerCase().includes(value);

    if (!matches && !step.classList.contains("collapsed")) {
        // COLLAPSE
        step.classList.add("collapsed");

        // lock current height
        body.style.maxHeight = body.scrollHeight + "px";

        // animate to 0
        requestAnimationFrame(() => {
            body.style.maxHeight = "0px";
        });

    } else if (matches && step.classList.contains("collapsed")) {
        // EXPAND
        step.classList.remove("collapsed");

        // start from 0 if needed
        body.style.maxHeight = "0px";

        // animate to full height
        requestAnimationFrame(() => {
            body.style.maxHeight = body.scrollHeight + "px";
        });

        // after transition, remove maxHeight so it can resize naturally
        body.addEventListener(
        "transitionend",
        () => {
            if (!step.classList.contains("collapsed")) {
            body.style.maxHeight = "none";
            }
        },
        { once: true }
        );
    }
    });
});

document.querySelectorAll('#stepNav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop - 20,
            behavior: "smooth"
        });
    });
});

loadTutorial();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".step-body").forEach(body => {
    body.style.maxHeight = body.scrollHeight + "px";
  });
});