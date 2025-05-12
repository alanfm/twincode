<?php

namespace Database\Factories;

use App\Models\Research;
use Illuminate\Database\Eloquent\Factories\Factory;
use Nette\PhpGenerator\PhpFile;
use Illuminate\Support\Str;
use Nette\PhpGenerator\Printer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comparison>
 */
class ComparisonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $code1 = $this->generateCode();
        // $code2 = $this->generateCode();
        return [
            'description' => $this->faker->sentence(),
            // 'language' => $this->faker->randomElement(['python', 'java', 'javaScript', 'c++', 'ruby']),
            'language' => 'php',
            'snippet_code_1' => $this->generateCode(),
            'snippet_code_2' => $this->generateCode(),
            'observation' => $this->faker->paragraph(),
            'research_id' => Research::all()->random()->id,
        ];
    }

    private function generateCode(): string
    {
        $types = ['int', 'string', 'array', 'bool'];
        $visibilities = ['public', 'protected', 'private'];

        $file = new PhpFile();
        $file->addNamespace($this->faker->word());

        $file->addComment('@package ' . $this->faker->word())
            ->addComment('@author ' . $this->faker->name())
            ->addComment('@copyright ' . $this->faker->year())
            ->addComment('@license ' . $this->faker->word())
            ->addComment('@link ' . $this->faker->url())
            ->addComment('@see ' . $this->faker->url());

        $finalOrAbstract = $this->faker->boolean();
        $code = $file->addClass($this->faker->word().Str::random(5))
            ->setFinal($finalOrAbstract)
            ->setAbstract(!$finalOrAbstract)
            ->setExtends($this->faker->word().Str::random(10))
            ->addComment($this->faker->sentence());

        for ($i = 1; $i < rand(3, 6); $i++) {
            $fakeMethod = $this->faker->word().ucfirst(Str::random($i));
            $method = $code->addMethod($fakeMethod)
            ->setBody($this->faker->text())
            ->setVisibility($this->faker->randomElement($visibilities));
            $method->addComment($this->faker->sentence());
            $method->addComment('@return ' . $this->faker->randomElement($types));
            $method->addComment('@param ' . $this->faker->randomElement($types) . ' $' . $this->faker->word());
            $method->setReturnType($this->faker->randomElement($types));
            $fakeParam = Str::random($i*3);
            $method->addParameter($this->faker->randomElement($types), $fakeParam)
                ->setType('string')
                ->setNullable(true);
        }

        for ($i = 3; $i < rand(3, 6); $i++) {
            $fakeProperty = $this->faker->word().ucfirst(Str::random($i));
            $property = $code->addProperty($fakeProperty, $this->faker->numberBetween(1, 100))
                ->setVisibility($this->faker->randomElement($visibilities))
                ->setType($this->faker->randomElement($types))
                ->setStatic(true);
            $property->addComment($this->faker->sentence());
            $property->addComment('@var ' . $this->faker->randomElement($types));
        }

        $code->addMethod('__construct')
            ->setBody($this->faker->text())
            ->setVisibility($this->faker->randomElement($visibilities))
            ->addComment($this->faker->sentence())
            ->addComment('@param ' . $this->faker->randomElement($types) . ' $' . $this->faker->word())
            ->setReturnType('void');

        return new Printer()->printFile($file);
    }
}
