---
layout: default
title: Portfolio
---

<section class="section hero container reveal" id="top">
  <div>
    <p class="section-title">Informatics at UW</p>
    <h1>Server-side builder crafting functional, impactful web experiences.</h1>
    <p class="lead">I’m Alon Levy, an Informatics student at the University of Washington focused on dependable back-end systems, thoughtful product architecture, and clean user journeys.</p>
    <div class="stagger" style="display:flex; gap:16px; flex-wrap:wrap; margin-top:20px;">
      <a class="button" href="#projects">View Projects</a>
      <a class="button" style="background: var(--accent-2);" href="#contact">Contact Me</a>
    </div>
  </div>
  <div class="hero-card">
    <h3>Current Focus</h3>
    <p class="lead">Building systems that stay stable under real-world use and scale gracefully.</p>
    <div class="hero-metrics">
      <div><span>Strengths</span> Debugging • API design • Data modeling</div>
      <div><span>Domains</span> Web apps • Server-side • ML foundations</div>
      <div><span>Workflow</span> Define → Build → Test → Refine</div>
    </div>
  </div>
</section>

<section class="section container reveal" id="about">
  <div>
    <p class="section-title">About Me</p>
    <p>I’m an Informatics major at the University of Washington with a technical focus on server-side programming, web development, and machine learning. I’m drawn to the puzzle of debugging and the clarity that comes from clean, well-tested APIs. My approach to server-side development is methodical: I start with strong data models, design scalable interfaces, and validate edge cases early so the system stays reliable as features grow.</p>
    <p>Outside the lab, I keep things balanced. I’m into bowling (always working on my two-handed technique), I ski when I can, and I spend a lot of time with my dog. These interests keep me grounded and curious, and they sharpen the collaboration and patience I bring to team projects.</p>
  </div>
</section>

<section class="section container reveal" id="projects">
  <div>
    <p class="section-title">Projects</p>
    <div class="card-grid">
      {% for project in site.data.projects %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
  </div>
</section>

<section class="section container reveal" id="skills">
  <div>
    <p class="section-title">Skills</p>
    <div class="skills-grid">
      <div class="card">
        <h3>Technical</h3>
        <div class="tag-list">
          {% for skill in site.data.skills.technical %}
            <span class="tag">{{ skill }}</span>
          {% endfor %}
        </div>
      </div>
      <div class="card">
        <h3>Soft Skills</h3>
        <div class="tag-list">
          {% for skill in site.data.skills.soft %}
            <span class="tag">{{ skill }}</span>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section container reveal" id="goals">
  <div>
    <p class="section-title">Future Goals</p>
    <p class="lead">I’m looking forward to my Capstone project in <strong>Spring 2026</strong> and continuing to deepen my software engineering skills. Long term, I’m excited to explore roles where I can leverage both technical and soft skills to build reliable, scalable, user-centered systems.</p>
  </div>
</section>

<section class="section container reveal" id="contact">
  <div>
    <p class="section-title">Contact & Links</p>
    <div class="contact-grid">
      {% for item in site.data.socials %}
        <a class="contact-card" href="{{ item.url }}">
          <span>{{ item.label }}</span>
          {% if item.button %}
            <span class="button">Download</span>
          {% else %}
            <span>→</span>
          {% endif %}
        </a>
      {% endfor %}
    </div>
  </div>
</section>
