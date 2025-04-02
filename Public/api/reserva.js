// api/reserva.js
const { createClient } = require('@supabase/supabase-js')

// 1. Configuração do Supabase (com suas credenciais)
const supabaseUrl = 'https://viwyrvovrrofjfsxpoli.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3lydm92cnJvZmpmc3hwb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDUyNjMsImV4cCI6MjA1OTEyMTI2M30.wgYtyltFQKZH8Q_3Hrc_YUkSXtZH23NwZ6yzBaFgGDk'
const supabase = createClient(supabaseUrl, supabaseKey)

// 2. Função principal (formatada para Vercel)
module.exports = async (req, res) => {
  // 2.1 Validação do método HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' })
  }

  // 2.2 Debug inicial (opcional)
  console.log('[DEBUG] Dados recebidos:', req.body)

  // 2.3 Processamento dos dados
  try {
    const { data, error } = await supabase
      .from('Reservas_Matsuri')
      .insert([{
        nome: req.body.nome,
        turma: req.body.turma,
        atividades: req.body.atividades || [],
        outros_especificar: req.body.outros || null,
        personagem: req.body.personagem || null,
        anime_serie: req.body.anime_serie || null,
        convidados: req.body.convidados === 'Sim',
        numero_convidados: req.body.convidados === 'Sim' 
          ? parseInt(req.body.numero_convidados) 
          : null,
        criado_em: new Date().toISOString()
      }])

    if (error) {
      console.error('[SUPABASE ERROR]', error)
      throw error
    }

    // 2.4 Resposta de sucesso
    return res.status(200).json({ 
      success: true,
      id: data[0].id  // Retorna o ID do registro criado
    })

  } catch (error) {
    // 2.5 Tratamento de erros
    console.error('[SERVER ERROR]', error)
    return res.status(400).json({
      error: 'Falha na reserva',
      details: error.message,
      supabase_error: error.code || null
    })
  }
}
