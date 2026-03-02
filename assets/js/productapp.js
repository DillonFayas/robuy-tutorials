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

            const header = document.createElement("h2");
            header.innerText = `Step ${stepIndex}: ${node.innerText}`;

            const body = document.createElement("div");
            body.className = "step-body";

            step.appendChild(header);
            step.appendChild(body);
            tutorial.appendChild(step);

            step.onclick = e => {
                if (e.target.tagName !== "A")
                    newDiv.classList.toggle("collapsed");
            };

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

        nav.appendChild(link);
    });
}

document.getElementById("search").addEventListener("input", e => {
    const value = e.target.value.toLowerCase().trim();

    document.querySelectorAll(".step").forEach(step => {
        const text = step.innerText.toLowerCase();
        if (!text.includes(value)) {
            step.classList.toggle("collapsed", true);
        } else {
            step.classList.toggle("collapsed", false);
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