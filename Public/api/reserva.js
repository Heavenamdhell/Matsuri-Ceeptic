// api/reserva.js
const { createClient } = require('@supabase/supabase-js')

// Dados do Supabase (mantidos conforme seu envio)
const supabaseUrl = 'https://viwyrvovrrofjfsxpoli.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3lydm92cnJvZmpmc3hwb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDUyNjMsImV4cCI6MjA1OTEyMTI2M30.wgYtyltFQKZH8Q_3Hrc_YUkSXtZH23NwZ6yzBaFgGDk'
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = async (req, res) => {
  // 1. Validação do método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  // 2. Processamento
  try {
    const { data, error } = await supabase
      .from('reservas_matsuri')
      .insert([{
        nome: req.body.nome,
        turma: req.body.turma,
        atividades: req.body.atividades || [],
        outros_especificar: req.body.outros || null,
        personagem: req.body.personagem || null,
        anime_serie: req.body.anime_serie || null,
        convidados: req.body.convidados === 'Sim',
        numero_convidados: req.body.convidados === 'Sim' ? 
                         parseInt(req.body.numero_convidados) : 
                         null,
        criado_em: new Date().toISOString()
      }])

    if (error) throw error
    return res.status(200).json({ 
      success: true,
      data: data[0] 
    })
    
  } catch (error) {
    console.error("Erro na reserva:", error)
    return res.status(400).json({ 
      error: 'Erro no servidor',
      details: error.message 
    })
  }
}
