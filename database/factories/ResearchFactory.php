<?php

namespace Database\Factories;

use App\Models\Research;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Research>
 */
class ResearchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'key' => Str::upper(Str::random(16)),
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(3),
            'author' => $this->faker->name(),
            'institution' => $this->faker->company(),
            'status' => $this->faker->randomElement(Research::STATUS),
            'acceptance_terms' => 'Bem-vindo(a)! Antes de prosseguir, solicitamos sua leitura e concordância com os seguintes termos de participação na nossa pesquisa:<br><div><br><div><b>1. Objetivo da Pesquisa.</b><br>Esta pesquisa tem como objetivo compreender hábitos de uso de recursos online e avaliar a eficácia de novas ferramentas de aprendizado digital. Sua colaboração é fundamental para melhorar nossos serviços.&nbsp;</div><div><br></div><div><b>2. Voluntariedade.</b></div><div>Sua participação é totalmente voluntária. Você pode interromper sua participação a qualquer momento, sem necessidade de justificar, e sem qualquer prejuízo.&nbsp;</div><div><br></div><div><b>3. Procedimentos.</b></div><div>Ao concordar, você será direcionado(a) para um formulário online que inclui perguntas de múltipla escolha e questões abertas. Estimamos que levará cerca de 10 a 15 minutos para ser concluído.</div><div><br></div><div><b>4. Confidencialidade e Privacidade.</b></div><div>Todas as informações fornecidas serão tratadas de forma estritamente confidencial. Os dados serão armazenados em servidor seguro e criptografados, sendo utilizados apenas para fins de análise estatística e desenvolvimento de relatórios. Nenhuma informação pessoal identificável será divulgada.</div><div><br></div><div><b>5. Riscos e Benefícios.&nbsp;</b></div><div>Não há riscos conhecidos além dos usuais relacionados ao preenchimento de formulários online. Você não receberá compensação financeira, mas sua participação contribuirá para o avanço do conhecimento na área de tecnologia educacional.</div><div><br></div><div><b>6. Contato.</b></div><div>Em caso de dúvidas ou solicitações de esclarecimento, entre em contato com a equipe de pesquisa pelo e-mail: pesquisa@exemplo.edu.br.</div></div>'
        ];
    }
}
