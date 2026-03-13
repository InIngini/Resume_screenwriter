// резюме-генератор/js/form-handler.js
class ResumeFormHandler {
    constructor(formId, previewContainerId, templateHtml, defaultData) {
        this.form = document.getElementById(formId);
        this.previewContainer = document.getElementById(previewContainerId);
        this.templateHtml = templateHtml;
        this.defaultData = defaultData;
        this.currentData = JSON.parse(JSON.stringify(defaultData));
        
        this.blockCounter = 0;
    
        this.initEventListeners();
        
        // Заполняем форму данными по умолчанию
        this.populateFormWithDefaultData();
        
        this.collectFormData();
        this.renderPreview();
    }

    initEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.collectFormData();
            this.renderPreview();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetForm();
        });

        document.querySelectorAll('.add-block-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const blockType = btn.dataset.block;
                this.addDynamicBlock(blockType);
            });
        });

        document.getElementById('addCustomBlockBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.addCustomBlock();
        });

        this.form.addEventListener('input', () => {
            this.collectFormData();
            this.renderPreview();
        });
    }

    addDynamicBlock(blockType) {
        const container = document.getElementById(`${blockType}Container`);
        if (!container) return;

        const blockId = `${blockType}_${this.blockCounter++}`;
        const block = document.createElement('div');
        block.className = `${blockType}-entry`;
        block.dataset.blockId = blockId;

        switch(blockType) {
            case 'skills':
                block.innerHTML = this.createSkillBlock(blockId);
                break;
            case 'links':
                block.innerHTML = this.createLinkBlock(blockId);
                break;
            case 'projects':
                block.innerHTML = this.createProjectBlock(blockId);
                break;
            case 'reasons':
                block.innerHTML = this.createReasonBlock(blockId);
                break;
        }

        container.appendChild(block);
    }

    createSkillBlock(blockId) {
        return `
            <div class="skill-entry">
                <div class="skill-header">
                    <input type="text" class="skill-title" placeholder="Название группы (например: Писательские)">
                    <button type="button" class="remove-block-btn" onclick="this.closest('.skill-entry').remove()">×</button>
                </div>
                <div class="form-group">
                    <label>Навыки (через запятую)</label>
                    <input type="text" class="skill-tags" placeholder="сюжет, диалоги, персонажи">
                </div>
            </div>
        `;
    }

    createLinkBlock(blockId) {
        return `
            <div class="link-entry">
                <div class="form-row">
                    <div class="form-group">
                        <label>Название</label>
                        <input type="text" class="link-text" placeholder="Название">
                    </div>
                    <div class="form-group">
                        <label>URL</label>
                        <input type="url" class="link-url" placeholder="https://...">
                    </div>
                </div>
                <button type="button" class="remove-block-btn" onclick="this.closest('.link-entry').remove()">×</button>
            </div>
        `;
    }

    createProjectBlock(blockId) {
        return `
            <div class="project-entry">
                <h4>Новый проект</h4>
                <button type="button" class="remove-block-btn" onclick="this.closest('.project-entry').remove()">×</button>
                <div class="form-group">
                    <label>Мета (период · платформа)</label>
                    <input type="text" class="project-meta" placeholder="2025 · платформа">
                </div>
                <div class="form-group">
                    <label>Название</label>
                    <input type="text" class="project-title" placeholder="Название проекта">
                </div>
                <div class="form-group">
                    <label>Описание</label>
                    <textarea class="project-desc" rows="2"></textarea>
                </div>
                <div class="form-group">
                    <label>Достижения (каждое с новой строки)</label>
                    <textarea class="project-achievements" rows="3"></textarea>
                </div>
            </div>
        `;
    }

    createReasonBlock(blockId) {
        return `
            <div class="reason-entry">
                <div class="form-row">
                    <div class="form-group">
                        <label>Заголовок</label>
                        <input type="text" class="reason-title" placeholder="Заголовок">
                    </div>
                    <div class="form-group">
                        <label>Текст</label>
                        <input type="text" class="reason-text" placeholder="Текст">
                    </div>
                </div>
                <button type="button" class="remove-block-btn" onclick="this.closest('.reason-entry').remove()">×</button>
            </div>
        `;
    }

    addCustomBlock() {
        const container = document.getElementById('customBlocksContainer');
        const blockId = `custom_${this.blockCounter++}`;
        
        const block = document.createElement('div');
        block.className = 'custom-block';
        block.dataset.blockId = blockId;
        
        block.innerHTML = `
            <div class="custom-block-header">
                <input type="text" class="custom-block-title" placeholder="Заголовок блока">
                <button type="button" class="remove-block-btn" onclick="this.closest('.custom-block').remove()">×</button>
            </div>
            <div class="custom-block-content">
                <div class="form-group">
                    <label>Содержимое (каждая строка - новый пункт)</label>
                    <textarea class="custom-block-items" rows="4" placeholder="Пункт 1&#10;Пункт 2&#10;Пункт 3"></textarea>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" class="custom-block-sidebar">
                        Показывать в левой колонке (сайдбар)
                    </label>
                </div>
            </div>
        `;
        
        container.appendChild(block);
    }addSkillBlock(title = 'Новые навыки', tagsStr = '') {
        const container = document.getElementById('skillsContainer');
        const blockId = `skill_${this.blockCounter++}`;
    
        const block = document.createElement('div');
        block.className = 'skill-entry';
        block.dataset.blockId = blockId;
        block.innerHTML = `
            <div class="skill-header">
                <input type="text" class="skill-title" value="${title}" placeholder="Название группы">
                <button type="button" class="remove-block-btn" onclick="this.closest('.skill-entry').remove()">×</button>
            </div>
            <div class="form-group">
                <input type="text" class="skill-tags" value="${tagsStr}" placeholder="навык1, навык2, навык3">
            </div>
        `;
        container.appendChild(block);
    }
    
    addLinkBlock(text = '', url = '') {
        const container = document.getElementById('linksContainer');
        const blockId = `link_${this.blockCounter++}`;
    
        const block = document.createElement('div');
        block.className = 'link-entry';
        block.dataset.blockId = blockId;
        block.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <input type="text" class="link-text" value="${text}" placeholder="Название">
                </div>
                <div class="form-group">
                    <input type="url" class="link-url" value="${url}" placeholder="https://...">
                </div>
            </div>
            <button type="button" class="remove-block-btn" onclick="this.closest('.link-entry').remove()">×</button>
        `;
        container.appendChild(block);
    }
    
    addReasonBlock(title = '', text = '') {
        const container = document.getElementById('reasonsContainer');
        const blockId = `reason_${this.blockCounter++}`;
    
        const block = document.createElement('div');
        block.className = 'reason-entry';
        block.dataset.blockId = blockId;
        block.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <input type="text" class="reason-title" value="${title}" placeholder="Заголовок">
                </div>
                <div class="form-group">
                    <input type="text" class="reason-text" value="${text}" placeholder="Текст">
                </div>
            </div>
            <button type="button" class="remove-block-btn" onclick="this.closest('.reason-entry').remove()">×</button>
        `;
        container.appendChild(block);
    }
    
    addProjectBlock(project = { meta: '', title: '', description: '', achievements: [] }) {
        const container = document.getElementById('projectsContainer');
        const blockId = `project_${this.blockCounter++}`;
    
        const block = document.createElement('div');
        block.className = 'project-entry';
        block.dataset.blockId = blockId;
        block.innerHTML = `
            <h4>Проект</h4>
            <button type="button" class="remove-block-btn" onclick="this.closest('.project-entry').remove()">×</button>
            <div class="form-group">
                <input type="text" class="project-meta" value="${project.meta}" placeholder="Период · платформа">
            </div>
            <div class="form-group">
                <input type="text" class="project-title" value="${project.title}" placeholder="Название проекта">
            </div>
            <div class="form-group">
                <textarea class="project-desc" rows="2" placeholder="Описание">${project.description || ''}</textarea>
            </div>
            <div class="form-group">
                <textarea class="project-achievements" rows="3" placeholder="Достижения (каждое с новой строки)">${(project.achievements || []).join('\n')}</textarea>
            </div>
        `;
        container.appendChild(block);
    }

    populateFormWithDefaultData() {
        // Заполняем простые поля
        document.getElementById('name').value = this.defaultData.name || '';
        document.getElementById('tagline').value = this.defaultData.tagline || '';
        document.getElementById('citizenship').value = this.defaultData.citizenship || '';
        document.getElementById('birthdate').value = this.defaultData.birthdate || '';
        document.getElementById('telegram').value = this.defaultData.telegram || '';
        document.getElementById('about').value = this.defaultData.about || '';
        document.getElementById('motivation').value = this.defaultData.motivation || '';
        document.getElementById('quoteText').value = this.defaultData.quoteText || '';
        document.getElementById('quoteAuthor').value = this.defaultData.quoteAuthor || '';
        
        // Фото
        if (this.defaultData.photos && this.defaultData.photos.length > 0) {
            document.getElementById('photo').value = this.defaultData.photos[0].url || '';
        }
        
        // Навыки (создаем блоки)
        if (this.defaultData.skillGroups && this.defaultData.skillGroups.length > 0) {
            this.defaultData.skillGroups.forEach(group => {
                this.addSkillBlock(group.title, group.tags.join(', '));
            });
        }
        
        // Ссылки
        if (this.defaultData.links && this.defaultData.links.length > 0) {
            this.defaultData.links.forEach(link => {
                this.addLinkBlock(link.text, link.url);
            });
        }
        
        // Причины
        if (this.defaultData.reasons && this.defaultData.reasons.length > 0) {
            this.defaultData.reasons.forEach(reason => {
                this.addReasonBlock(reason.title, reason.text);
            });
        }
        
        // Проекты
        if (this.defaultData.projects && this.defaultData.projects.length > 0) {
            this.defaultData.projects.forEach(project => {
                this.addProjectBlock(project);
            });
        }
    }
    collectFormData() {
        // Базовая информация
        this.currentData.name = document.getElementById('name')?.value || '';
        this.currentData.tagline = document.getElementById('tagline')?.value || '';
        this.currentData.citizenship = document.getElementById('citizenship')?.value || '';
        this.currentData.birthdate = document.getElementById('birthdate')?.value || '';
        this.currentData.telegram = document.getElementById('telegram')?.value || '';
        this.currentData.about = document.getElementById('about')?.value || '';
        this.currentData.motivation = document.getElementById('motivation')?.value || '';
        this.currentData.quoteText = document.getElementById('quoteText')?.value || '';
        this.currentData.quoteAuthor = document.getElementById('quoteAuthor')?.value || '';

        // Фото
        const photoUrl = document.getElementById('photo')?.value || '';
        this.currentData.photos = photoUrl ? [{ url: photoUrl }] : [];

        // Ссылки
        this.currentData.links = [];
        document.querySelectorAll('.link-entry').forEach(entry => {
            const text = entry.querySelector('.link-text')?.value;
            const url = entry.querySelector('.link-url')?.value;
            if (text && url) {
                this.currentData.links.push({ text, url });
            }
        });

        // Навыки
        this.currentData.skillGroups = [];
        document.querySelectorAll('.skill-entry').forEach(entry => {
            const title = entry.querySelector('.skill-title')?.value;
            const tagsStr = entry.querySelector('.skill-tags')?.value;
            if (title && tagsStr) {
                const tags = tagsStr.split(',').map(s => s.trim()).filter(s => s);
                if (tags.length > 0) {
                    this.currentData.skillGroups.push({ title, tags });
                }
            }
        });

        // Причины
        this.currentData.reasons = [];
        document.querySelectorAll('.reason-entry').forEach(entry => {
            const title = entry.querySelector('.reason-title')?.value;
            const text = entry.querySelector('.reason-text')?.value;
            if (title && text) {
                this.currentData.reasons.push({ title, text });
            }
        });

        // Проекты
        this.currentData.projects = [];
        document.querySelectorAll('.project-entry').forEach(entry => {
            const meta = entry.querySelector('.project-meta')?.value || '';
            const title = entry.querySelector('.project-title')?.value;
            const description = entry.querySelector('.project-desc')?.value || '';
            const achievementsText = entry.querySelector('.project-achievements')?.value || '';
            
            if (title) {
                const achievements = achievementsText.split('\n').map(s => s.trim()).filter(s => s);
                this.currentData.projects.push({ meta, title, description, achievements });
            }
        });

        // Кастомные блоки
        this.currentData.customBlocks = [];
        document.querySelectorAll('.custom-block').forEach(block => {
            const title = block.querySelector('.custom-block-title')?.value;
            const itemsText = block.querySelector('.custom-block-items')?.value;
            const inSidebar = block.querySelector('.custom-block-sidebar')?.checked;
            
            if (title && itemsText) {
                const items = itemsText.split('\n').map(s => s.trim()).filter(s => s);
                this.currentData.customBlocks.push({ title, items, inSidebar: inSidebar || false });
            }
        });
    }

    renderPreview() {
        let html = this.templateHtml;
        
        // Заменяем базовые поля
        html = html.replace(/{{name}}/g, this.currentData.name || '');
        html = html.replace(/{{tagline}}/g, this.currentData.tagline || '');
        html = html.replace(/{{citizenship}}/g, this.currentData.citizenship || '');
        html = html.replace(/{{birthdate}}/g, this.currentData.birthdate || '');
        html = html.replace(/{{telegram}}/g, this.currentData.telegram || '');
        html = html.replace(/{{about}}/g, this.currentData.about || '');
        html = html.replace(/{{motivation}}/g, this.currentData.motivation || '');
        html = html.replace(/{{currentDate}}/g, new Date().toLocaleDateString('ru-RU'));

        // Фото
        const photoUrl = document.getElementById('photo')?.value;
        if (photoUrl) {
            html = html.replace('{{photoBlock}}', `<div class="photo-placeholder"><img src="${photoUrl}" alt="фото"></div>`);
        } else {
            html = html.replace('{{photoBlock}}', '<div class="photo-placeholder"></div>');
        }

        // Ссылки
        let linksHtml = '';
        this.currentData.links.forEach(link => {
            linksHtml += `<li><a href="${link.url}" target="_blank"><span class="bullet">●</span> ${link.text}</a></li>`;
        });
        html = html.replace('{{linksBlock}}', linksHtml);

        // Навыки
        let skillsHtml = '';
        this.currentData.skillGroups.forEach(group => {
            const tagsHtml = group.tags.map(tag => `<span class="badge">${tag}</span>`).join('');
            skillsHtml += `
                <div class="section">
                    <div class="section-title">${group.title.toLowerCase()}</div>
                    <div class="badge-container">${tagsHtml}</div>
                </div>
            `;
        });
        html = html.replace('{{skillsBlocks}}', skillsHtml);

        // Причины
        let reasonsHtml = '';
        this.currentData.reasons.forEach(reason => {
            reasonsHtml += `<div><span style="color:#e86f5e; font-weight:600;">→</span> <strong>${reason.title}</strong> ${reason.text}</div>`;
        });
        html = html.replace('{{reasonsBlock}}', reasonsHtml);

        // Проекты
        let projectsHtml = '';
        this.currentData.projects.forEach(project => {
            let achievementsHtml = '';
            project.achievements.forEach(ach => {
                achievementsHtml += `<li>${ach}</li>`;
            });
            
            projectsHtml += `
                <div class="project-item">
                    <div class="project-meta">${project.meta}</div>
                    <h4>${project.title}</h4>
                    ${project.description ? `<p>${project.description}</p>` : ''}
                    <ul>${achievementsHtml}</ul>
                </div>
            `;
        });
        html = html.replace('{{projectsBlock}}', projectsHtml);

        // Кастомные блоки
        let customSidebarHtml = '';
        let customMainHtml = '';
        
        this.currentData.customBlocks.forEach(block => {
            const itemsHtml = block.items.map(item => `<li>${item}</li>`).join('');
            const blockHtml = `
                <div class="section">
                    <div class="section-title">${block.title.toLowerCase()}</div>
                    <ul style="list-style: none; padding-left: 0;">${itemsHtml}</ul>
                </div>
            `;
            
            if (block.inSidebar) {
                customSidebarHtml += blockHtml;
            } else {
                customMainHtml += blockHtml;
            }
        });

        html = html.replace('{{customSidebarBlocks}}', customSidebarHtml);
        html = html.replace('{{customMainBlocks}}', customMainHtml);

        // Цитата
        if (this.currentData.quoteText && this.currentData.quoteAuthor) {
            html = html.replace('{{quoteBlock}}', `
                <div style="margin-top: 2rem; font-size:0.85rem; color:#6f7a8a; border-top: 1px dashed #2f353d; padding-top: 1rem;">
                    <i>«${this.currentData.quoteText}»</i><br>
                    <span style="color:#4f5a68;">— ${this.currentData.quoteAuthor}</span>
                </div>
            `);
        } else {
            html = html.replace('{{quoteBlock}}', '');
        }

        this.previewContainer.innerHTML = html;
    }

    resetForm() {
        // Очищаем форму
        this.form.reset();
        
        // Очищаем все динамические контейнеры
        document.getElementById('skillsContainer').innerHTML = '';
        document.getElementById('linksContainer').innerHTML = '';
        document.getElementById('projectsContainer').innerHTML = '';
        document.getElementById('reasonsContainer').innerHTML = '';
        document.getElementById('customBlocksContainer').innerHTML = '';
        
        // Очищаем текущие данные
        this.currentData = {
            name: '', tagline: '', citizenship: '', birthdate: '', telegram: '',
            about: '', motivation: '', quoteText: '', quoteAuthor: '',
            photos: [], links: [], skillGroups: [], reasons: [], projects: [], customBlocks: []
        };
        
        // Обновляем превью (будет пустым)
        this.renderPreview();
    }
}