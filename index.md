---
layout: default
title: Portfolio
---

<section class="section hero container reveal" id="top">
  <div>
    <p class="lead">I’m Alon Levy, an Informatics student at the University of Washington focused on dependable back-end systems, thoughtful product architecture, and machine learning.</p>
    <div class="stagger" style="display:flex; gap:16px; flex-wrap:wrap; margin-top:20px;">
      <a class="button" href="#projects">View Projects</a>
      <a class="button" style="background: var(--accent-2);" href="#contact">Contact Me</a>
    </div>
  </div>
</section>

<section class="section container reveal" id="about">
  <div>
    <p class="section-title">About Me</p>
    <p>I am an Informatics student at the University of Washington with a focus on
      full-stack development and machine learning. My technical work currently
      revolves around building intelligent document generation systems for Propper AI. I also have personal projects in software developmet, machine learning, prompt engineering, database management.
    </p>
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
