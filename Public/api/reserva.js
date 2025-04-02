// api/reserva.js
import { createClient } from '@supabase/supabase-js'

// 1. Configuração EXATA como o Supabase recomenda (com suas credenciais)
const supabaseUrl = 'https://viwyrvovrrofjfsxpoli.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3lydm92cnJvZmpmc3hwb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDUyNjMsImV4cCI6MjA1OTEyMTI2M30.wgYtyltFQKZH8Q_3Hrc_YUkSXtZH23NwZ6yzBaFgGDk'
const supabase = createClient(supabaseUrl, supabaseKey)

// 2. Adaptação para a Vercel (sem alterar a lógica)
export default async (req, res) => {
  // Debug inicial
  console.log('[SUPABASE] Endpoint acionado. Método:', req.method)
  
  // Validação do método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST permitido' })
  }

  try {
    // 3. Inserção no formato Supabase (com tratamento de erro)
    const { data, error } = await supabase
      .from('Reservas_Matsuri')
      .insert([req.body]) // Envia o body diretamente

    if (error) {
      console.error('[SUPABASE ERROR]', error)
      throw error
    }

    // Resposta de sucesso
    return res.status(200).json({ 
      success: true,
      data: data[0] 
    })

  } catch (error) {
    // Tratamento de erros detalhado
    return res.status(500).json({
      error: 'Erro no Supabase',
      details: error.message,
      code: error.code || null
    })
  }
}
