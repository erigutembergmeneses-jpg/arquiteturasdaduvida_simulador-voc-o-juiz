/**
 * SIMULADOR CALNF - ARQUITETURAS DA DÚVIDA
 * Script Principal
 * 
 * Este script gerencia a lógica do simulador interativo de avaliação
 * de laudos neurológicos forenses baseado no Checklist CALNF.
 */

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

const CONFIG = {
    totalCases: 5,
    correctCases: [false, true, false, true, false], // Casos 2 e 4 são sólidos
    benchmark: 89, // Padrão de juízes treinados com CALNF
    controlGroup: 31 // Padrão de juízes sem treinamento
};

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================

let state = {
    currentCase: 1,
    correctAnswers: 0,
    casesEvaluated: 0
};

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

/**
 * Avalia um caso específico
 * @param {number} caseNum - Número do caso (1-5)
 * @param {boolean} isSolid - Se o laudo é metodologicamente sólido
 */
function evaluateCase(caseNum, isSolid) {
    // Validação da resposta
    const isCorrect = isSolid === CONFIG.correctCases[caseNum - 1];
    
    if (isCorrect) {
        state.correctAnswers++;
    }
    
    state.casesEvaluated++;
    
    // Exibir feedback
    const feedback = document.getElementById(`feedback${caseNum}`);
    if (feedback) {
        feedback.style.display = 'block';
    }
    
    // Atualizar estatísticas
    updateStats();
    
    // Aguardar e avançar para o próximo caso
    setTimeout(() => {
        // Ocultar caso atual
        const currentCaseCard = document.getElementById(`case${caseNum}`);
        if (currentCaseCard) {
            currentCaseCard.classList.add('hidden');
        }
        
        // Verificar se há mais casos
        if (state.currentCase < CONFIG.totalCases) {
            // Mostrar próximo caso
            state.currentCase++;
            const nextCaseCard = document.getElementById(`case${state.currentCase}`);
            if (nextCaseCard) {
                nextCaseCard.classList.remove('hidden');
            }
            
            // Atualizar barra de progresso
            const progress = ((state.currentCase - 1) / CONFIG.totalCases) * 100;
            document.getElementById('progressBar').style.width = `${progress}%`;
            
            // Scroll suave para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Mostrar resultados finais
            showFinalResults();
        }
    }, 3000);
}

/**
 * Atualiza as estatísticas na interface
 */
function updateStats() {
    // Atualizar casos avaliados
    document.getElementById('casesEvaluated').textContent = 
        `${state.casesEvaluated}/${CONFIG.totalCases}`;
    
    // Calcular e atualizar taxa de acerto
    const accuracy = Math.round((state.correctAnswers / state.casesEvaluated) * 100) || 0;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
}

/**
 * Exibe os resultados finais
 */
function showFinalResults() {
    // Calcular taxa de acerto final
    const accuracy = Math.round((state.correctAnswers / CONFIG.totalCases) * 100);
    
    // Atualizar pontuação
    document.getElementById('yourScore').textContent = `${accuracy}%`;
    
    // Atualizar barra de progresso para 100%
    document.getElementById('progressBar').style.width = '100%';
    
    // Gerar análise de desempenho
    const analysis = generatePerformanceAnalysis(accuracy);
    document.getElementById('performanceAnalysis').innerHTML = analysis;
    
    // Mostrar seção de resultados finais
    const finalResults = document.getElementById('finalResults');
    if (finalResults) {
        finalResults.style.display = 'block';
    }
    
    // Scroll suave para os resultados
    setTimeout(() => {
        finalResults.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

/**
 * Gera análise de desempenho baseada na taxa de acerto
 * @param {number} accuracy - Taxa de acerto (0-100)
 * @returns {string} HTML da análise
 */
function generatePerformanceAnalysis(accuracy) {
    let analysis = '';
    
    if (accuracy === 100) {
        analysis = `
            <strong>🏆 EXCELENTE!</strong> Você atingiu o padrão de juízes treinados com CALNF (89%+). 
            Você demonstrou capacidade de identificar laudos fraudulentos e validar laudos sólidos, 
            aplicando corretamente as 3 camadas de filtragem do CALNF. Você está preparado para 
            exercer o papel de gatekeeper epistemológico!
        `;
    } else if (accuracy >= 80) {
        analysis = `
            <strong>✅ MUITO BOM!</strong> Você está muito próximo do padrão de juízes treinados (89%). 
            Com pequenas melhorias na aplicação das camadas do CALNF, você atingirá o nível de excelência. 
            Continue desenvolvendo sua capacidade de escrutínio metodológico!
        `;
    } else if (accuracy >= 60) {
        analysis = `
            <strong>✅ BOM DESEMPENHO!</strong> Você superou a média de juízes sem treinamento (31%) 
            e está no caminho certo. Com treinamento CALNF de 4 horas, você pode atingir o padrão de 89%. 
            Continue desenvolvendo sua capacidade de escrutínio metodológico!
        `;
    } else if (accuracy >= 40) {
        analysis = `
            <strong>️ DESEMPENHO REGULAR</strong> Você está acima da média de juízes sem treinamento, 
            mas ainda precisa desenvolver habilidades de análise crítica de laudos neurológicos. 
            O treinamento CALNF pode ajudar significativamente!
        `;
    } else {
        analysis = `
            <strong>📚 PRECISA DE TREINAMENTO</strong> Seu desempenho está abaixo da média. 
            Isso é NORMAL - o estudo piloto mostrou que juízes SEM CALNF acertam apenas 31%. 
            Com o treinamento CALNF de 4 horas, a taxa salta para 89%. O CALNF é uma prótese 
            cognitiva que supre lacunas de conhecimento técnico!
        `;
    }
    
    return analysis;
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa a aplicação quando a página carrega
 */
window.addEventListener('DOMContentLoaded', function() {
    // Configurar barra de progresso inicial
    const initialProgress = (1 / CONFIG.totalCases) * 100;
    document.getElementById('progressBar').style.width = `${initialProgress}%`;
    
    console.log('Simulador CALNF inicializado com sucesso!');
    console.log(`Total de casos: ${CONFIG.totalCases}`);
    console.log(`Benchmark: ${CONFIG.benchmark}%`);
});

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Rola a página para um elemento específico
 * @param {string} elementId - ID do elemento
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Reinicia o simulador
 */
function resetSimulator() {
    if (confirm('Deseja realmente reiniciar o simulador? Todo o progresso será perdido.')) {
        location.reload();
    }
}

// Exportar funções para uso global
window.evaluateCase = evaluateCase;
window.resetSimulator = resetSimulator;
