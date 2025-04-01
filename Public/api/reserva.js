import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://viwyrvovrrofjfsxpoli.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3lydm92cnJvZmpmc3hwb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDUyNjMsImV4cCI6MjA1OTEyMTI2M30.wgYtyltFQKZH8Q_3Hrc_YUkSXtZH23NwZ6yzBaFgGDk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

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
                         null
      }])

    if (error) throw error
    return res.status(200).json({ success: true })
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
