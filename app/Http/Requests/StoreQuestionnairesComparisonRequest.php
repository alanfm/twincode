<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionnairesComparisonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
        ];
    }

    public function withValidator($validator)
    {
        $answers = $this->answers ?? [];

        foreach ($answers as $index => $answer) {
            if (is_array($answer)) {
                $validator->addRules([
                    "answers.$index" => 'required|exists:options,id',
                ]);
            }

            if (is_string($answer)) {
                $validator->addRules([
                    "answers.$index" => 'required|string|max:255',
                ]);
            }

            if (ctype_digit($answer)) {
                $validator->addRules([
                    "answers.$index" => 'required|exists:options,id',
                ]);
            }
        }
    }

    public function messages()
    {
        return [
            'answers.*.exists' => 'A opção selecionada é inválida.',
            'answers.*.required' => 'Resposta obrigatória.',
        ];
    }
}
